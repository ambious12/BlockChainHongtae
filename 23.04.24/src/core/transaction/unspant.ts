import Transaction from './transaction'
import {
    Receipt,
    TransactionRow,
    TxIn,
    TxOut,
    UnspentTxOut,
    UnspentTxOutPool,
} from './transaction.interface'

// UnspentTxOutPool -> UnspentTxOut[]

class Unspent {
    private readonly unspentTxOuts: UnspentTxOutPool = []
    constructor(private readonly transaction: Transaction) {}

    // getter
    getUnspentTxPool() {
        return this.unspentTxOuts
    }

    delete(txin: TxIn) {
        // 배열인덱스 찾기 splice -> 원본 유지하면서!
        // txoutid , txoutindex

        const index = this.unspentTxOuts.findIndex((utxo) => {
            return utxo.txOutId === txin.txOutId && utxo.txOutIndex === txin.txOutIndex
        })

        this.unspentTxOuts.splice(index)
    }

    createUTXO(transaction: TransactionRow): void {
        const { hash, txOuts } = transaction
        if (!hash) throw new Error('hash 값이 존재하지 않습니다.')

        // TxOuts 을 가지고 미사용트랜잭션 객체를 만드는데
        // txouts 갯수가 n

        // transaction , txin -> 삭제하는..
        transaction.txIns.forEach((v) => this.delete(v))

        // transaction , txout -> 생성하는!

        const newUnspentTxOut = txOuts.map((txout: TxOut, index: number) => {
            const unspentTxOut = new UnspentTxOut()
            unspentTxOut.txOutId = hash
            unspentTxOut.txOutIndex = index
            unspentTxOut.account = txout.account
            unspentTxOut.amount = txout.amount
            return unspentTxOut
        })
        this.unspentTxOuts.push(...newUnspentTxOut)

        // const index = 0
        // const utxo = new UnspentTxOut()
        // utxo.txOutId = hash
        // utxo.txOutIndex = index
        // utxo.account = txOuts[index].account
        // utxo.amount = txOuts[index].amount
        // return utxo
    }

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

    getInput(receipt: Receipt) {
        const {
            sender: { account },
            amount, // 30
        } = receipt

        const myUnspentTxOuts = this.me(account) // [{amount:10},{amount:10},{amount:10}]

        // 나의 관련된 미사용객체에서 < `receipt.amount`

        let targetAmount = 0
        let txins = []

        for (const unspentTxOut of myUnspentTxOuts) {
            targetAmount += unspentTxOut.amount
            const txin = this.transaction.createTxIn(
                unspentTxOut.txOutIndex,
                unspentTxOut.txOutId,
                receipt.signature
            )
            txins.push(unspentTxOut)
            if (targetAmount >= amount) break
        }

        return txins
    }

    getOutput(receipt: Receipt) {
        // 받는사람에 대한 txout
        const {
            sender: { account },
            received,
            amount,
        } = receipt
        const txOuts = []
        const totalAmount = this.getAmount(this.me(account))
        const recevied_txout = this.transaction.createTxOut(received, amount)
        txOuts.push(recevied_txout)

        if (totalAmount - amount > 0) {
            // true ? 잔액이 발생되었을때
            const sender_txout = this.transaction.createTxOut(account, totalAmount - amount)
            txOuts.push(sender_txout)
        }
        return txOuts
    }
}

export default Unspent
