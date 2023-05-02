import { SignatureInput } from 'elliptic'

export class Sender {
    publicKey?: string
    account!: string
}

/**
  예를들어 Receipt(영수증)이
  sender:곽인구
  received:이세욱
  amount:20
  signature:0x........
 */

export class Receipt {
    sender!: Sender
    received!: string
    amount!: number
    signature?: SignatureInput
}

export class TxIn {
    txOutId?: string
    txOutIndex!: number
    signature?: SignatureInput
}

export class TxOut {
    account!: string
    amount!: number
}

export class TransactionRow {
    txIns!: TxIn[]
    txOuts!: TxOut[]
    hash?: string // Transaction에 대한 고유한 식별자
}

export class UnspentTxOut {
    txOutId!: string
    txOutIndex!: number
    account!: string
    amount!: number
}

export type TransactionData = string | TransactionRow[]
export type UnspentTxOutPool = UnspentTxOut[]
export type TransactionPool = TransactionRow[]

/**

  TransactionData:{
    TxIns:[]
    TxOuts:[
        {   
            txoutindex:1
            account:곽인구
            amount:50
        }
    ],
    hash:0001
  }

  TxOut{
    account:곽인구
    amount:50
  }

  TxOut{
    account:이세욱
    amount:20
  }

  TransactionRow{
    txins:[{
        txOutIndex: 1
    }],
    txouts:[
        {
            account:이세욱
            amount:20
        }
    ],{
        account:곽인구
        amount:30
    },
    hash:0x....
  }
 */
