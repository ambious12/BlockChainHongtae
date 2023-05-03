// Bitcoin
// 50 BTC , 소수점으로 거래가됨
// 1 BTC -> 10 ** 18 -> 10의18승

import { IBlock } from '@core/block/block.interface'
import CryptoModule from '@core/crypto/crypto.module'
import { TransactionRow, TxIn, TxOut } from './transaction.interface'
import { SignatureInput } from 'elliptic'
import { Receipt } from '@core/wallet/wallet.interface'
class Transaction {
    private readonly REWARD = 50
    constructor(private readonly crypto: CryptoModule) {}

    create(receipt: Receipt) {
        const totalAmount = 50
        const txin1 = this.createTxIn(1, '', receipt.signature)

        // // TxOut
        const txout_sender = this.createTxOut(receipt.sender.account, totalAmount - receipt.amount)
        const txout_recevied = this.createTxOut(receipt.received, receipt.amount)

        return this.createRow([txin1], [txout_sender, txout_recevied])

        // // ----- 위의 코드는 transaction 만들고싶음 ------
    }

    // TxOut
    createTxOut(account: string, amount: number): TxOut {
        // publicKey -> 32 byte(64글자) - 12byte = 20byte
        // account -> publicKey (앞에 12 byte 날림)-> 40글자
        if (account.length !== 40) throw new Error('Account 형식이 올바르지 않습니다.')
        const txout = new TxOut()
        txout.account = account
        txout.amount = amount
        return txout
    }

    serializeTxOut(txOut: TxOut): string {
        const { account, amount } = txOut
        const text = [account, amount].join('')

        return this.crypto.SHA256(text)
    }

    serializeTxIn(txIn: TxIn): string {
        const { txOutIndex } = txIn
        const text = [txOutIndex].join('')

        return this.crypto.SHA256(text)
    }

    serializeTx<T>(data: T[], callback: (item: T) => string) {
        return data.reduce((acc: string, item: T) => acc + callback(item), '')
    }

    serializeRow(row: TransactionRow) {
        const { txIns, txOuts } = row

        const text1 = this.serializeTx<TxOut>(txOuts, (item) => this.serializeTxOut(item))
        const text2 = this.serializeTx<TxIn>(txIns, (item) => this.serializeTxIn(item))

        return this.crypto.SHA256(text1 + text2)

        // const txoutText = txOuts.reduce((acc: string, v: TxOut) => {
        //     return acc + this.serializeTxOut(v)
        // }, '')
        // const txinText = txIns.reduce((acc: string, v: TxIn) => {
        //     return acc + this.serializeTxIn(v)
        // }, '')

        // console.log(txoutText, text1) // hash or hash + hash
        // console.log(txinText, text2)
    }

    createTxIn(txOutIndex: number, txOutId?: string, signature?: SignatureInput): TxIn {
        const txIn = new TxIn()
        txIn.txOutIndex = txOutIndex
        txIn.txOutId = txOutId
        txIn.signature = signature
        return txIn
    }

    createRow(txIns: TxIn[], TxOuts: TxOut[]) {
        const transactionRow = new TransactionRow()
        transactionRow.txIns = txIns
        transactionRow.txOuts = TxOuts
        transactionRow.hash = this.serializeRow(transactionRow)
        return transactionRow
    }

    createCoinBase(account: string, latestBlockHeight: number) {
        // 마이닝
        const txin = this.createTxIn(latestBlockHeight + 1)
        const txout = this.createTxOut(account, this.REWARD)
        return this.createRow([txin], [txout]) // Tx
        // TransactionRow
    }
}

export default Transaction
