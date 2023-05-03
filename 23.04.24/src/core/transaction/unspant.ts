import { Receipt } from '@core/wallet/wallet.interface'
import { SignatureInput } from 'elliptic'
import Transaction from './transaction'
import {
    TransactionData,
    TransactionRow,
    TxIn,
    TxOut,
    UnspentTxOut,
    UnspentTxOutPool,
} from './transaction.interface'

// UnspentTxOutPool -> UnspentTxOut[]

class Unspent {
    private readonly unspentTxOuts: UnspentTxOutPool = []
    constructor() {}

    // getter
    getUnspentTxPool() {
        return this.unspentTxOuts
    }

    // delete(txin: TxIn) {
    //     // 배열인덱스 찾기 splice -> 원본 유지하면서!
    //     // txoutid , txoutindex

    //     const index = this.unspentTxOuts.findIndex((utxo) => {
    //         return utxo.txOutId === txin.txOutId && utxo.txOutIndex === txin.txOutIndex
    //     })

    //     this.unspentTxOuts.splice(index)
    // }

    delete(txin: TxIn) {
        const { txOutId, txOutIndex } = txin
        const index = this.unspentTxOuts.findIndex((unspentTxOut: UnspentTxOut) => {
            return unspentTxOut.txOutId == txOutId && unspentTxOut.txOutIndex === txOutIndex
        })

        if (index !== -1) this.unspentTxOuts.splice(index, 1)
    }

    // 고차함수
    create(hash: string) {
        return (txout: TxOut, txOutIndex: number) => {
            const { amount, account } = txout
            this.unspentTxOuts.push({
                txOutId: hash,
                txOutIndex,
                account,
                amount,
            })
        }
    }

    sync(transactions: TransactionData) {
        if (typeof transactions === 'string') return

        transactions.forEach(this.update.bind(this))
    }

    update(transaction: TransactionRow): void {
        const { txIns, txOuts, hash } = transaction
        if (!hash) throw new Error('hash값 존재하지 않아~')

        txOuts.forEach(this.create(hash))
        txIns.forEach(this.delete.bind(this))
    }

    //=======================================//
    // createUTXO(transaction: TransactionRow): void {
    //     const { hash, txOuts } = transaction
    //     if (!hash) throw new Error('hash 값이 존재하지 않습니다.')

    //     // TxOuts 을 가지고 미사용트랜잭션 객체를 만드는데
    //     // txouts 갯수가 n

    //     // transaction , txin -> 삭제하는..
    //     transaction.txIns.forEach((v) => this.delete(v))

    //     // transaction , txout -> 생성하는!

    //     const newUnspentTxOut = txOuts.map((txout: TxOut, index: number) => {
    //         const unspentTxOut = new UnspentTxOut()
    //         unspentTxOut.txOutId = hash
    //         unspentTxOut.txOutIndex = index
    //         unspentTxOut.account = txout.account
    //         unspentTxOut.amount = txout.amount
    //         return unspentTxOut
    //     })
    //     this.unspentTxOuts.push(...newUnspentTxOut)

    //     // const index = 0
    //     // const utxo = new UnspentTxOut()
    //     // utxo.txOutId = hash
    //     // utxo.txOutIndex = index
    //     // utxo.account = txOuts[index].account
    //     // utxo.amount = txOuts[index].amount
    //     // return utxo
    // }
    //=======================================//
    me(account: string): UnspentTxOut[] {
        // 내가 가지고있는 unspent만 구하기
        const myUnspentTxOuts = this.unspentTxOuts.filter((utxo) => (utxo.account = account))
        return myUnspentTxOuts
    }

    getAmount(myUnspentTxOuts: UnspentTxOut[]) {
        return myUnspentTxOuts.reduce((acc, utxo) => acc + utxo.amount, 0)
    }

    isAmount(account: string, sendAmount: number) {
        const myUnspentTxOuts = this.me(account)
        const totalAmount = this.getAmount(myUnspentTxOuts)
        if (totalAmount < sendAmount) return true
        return false
    }

    getInput(myUnspentTxOuts: UnspentTxOut[], receiptAmount: number, signature: SignatureInput) {
        // transactionRow 에서 txIns[] 만드는거

        let targetAmount = 0

        const txins = myUnspentTxOuts.reduce((acc: TxIn[], unspentTxOut: UnspentTxOut) => {
            const { amount, txOutId, txOutIndex } = unspentTxOut
            if (targetAmount >= receiptAmount) return acc
            targetAmount += amount
            acc.push({
                txOutIndex,
                txOutId,
                signature,
            })
            return acc
        }, [] as TxIn[])

        // const {
        //     sender: { account },
        //     amount, // 30
        // } = receipt

        // const myUnspentTxOuts = this.me(account) // [{amount:10},{amount:10},{amount:10}]

        // // 나의 관련된 미사용객체에서 < `receipt.amount`

        // let targetAmount = 0
        // let txins = []

        // for (const unspentTxOut of myUnspentTxOuts) {
        //     targetAmount += unspentTxOut.amount
        //     const txin = this.transaction.createTxIn(
        //         unspentTxOut.txOutIndex,
        //         unspentTxOut.txOutId,
        //         receipt.signature
        //     )
        //     txins.push(unspentTxOut)
        //     if (targetAmount >= amount) break
        // }

        return txins
    }

    // 보내는사람 주소 , 보낼 금액 , 나의 주소, 나의 금액
    getOutput(received: string, amount: number, sender: string, balance: number) {
        // 받는사람에 대한 txout
        // 내가 가지고있는 자산에서
        // 보낼금액을 뺏을때
        // 0 이상일 경우 , 잔돈을

        const txouts: TxOut[] = []
        txouts.push({ account: received, amount })

        if (balance - amount > 0) {
            txouts.push({ account: sender, amount: balance })
        }

        return txouts

        // ==================================================================== //
        // const {
        //     sender: { account },
        //     received,
        //     amount,
        // } = receipt
        // const txOuts = []
        // const totalAmount = this.getAmount(this.me(account))
        // const recevied_txout = this.transaction.createTxOut(received, amount)
        // txOuts.push(recevied_txout)

        // if (totalAmount - amount > 0) {
        //     // true ? 잔액이 발생되었을때
        //     const sender_txout = this.transaction.createTxOut(account, totalAmount - amount)
        //     txOuts.push(sender_txout)
        // }
        // return txOuts
    }
}

export default Unspent
