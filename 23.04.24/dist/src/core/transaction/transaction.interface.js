"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnspentTxOut = exports.TransactionRow = exports.TxOut = exports.TxIn = void 0;
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
