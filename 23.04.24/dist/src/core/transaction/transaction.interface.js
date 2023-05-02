"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnspentTxOut = exports.TransactionRow = exports.TxOut = exports.TxIn = exports.Receipt = exports.Sender = void 0;
class Sender {
}
exports.Sender = Sender;
/**
  예를들어 Receipt(영수증)이
  sender:곽인구
  received:이세욱
  amount:20
  signature:0x........
 */
class Receipt {
}
exports.Receipt = Receipt;
class TxIn {
}
exports.TxIn = TxIn;
class TxOut {
}
exports.TxOut = TxOut;
class TransactionRow {
}
exports.TransactionRow = TransactionRow;
class UnspentTxOut {
}
exports.UnspentTxOut = UnspentTxOut;
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
