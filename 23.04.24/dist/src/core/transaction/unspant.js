"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_interface_1 = require("./transaction.interface");
class Unspent {
    constructor() {
        this.UnspentTxOuts = [];
    }
    createUTXO(transaction) {
        const { hash, txOuts } = transaction;
        if (!hash)
            throw new Error('hash 값이 존재하지 않습니다.');
        // TxOuts 을 가지고 미사용트랜잭션 객체를 만드는데
        // txouts 갯수가 n
        const newUnspentTxOut = txOuts.map((txout, index) => {
            const unspentTxOut = new transaction_interface_1.UnspentTxOut();
            unspentTxOut.txOutId = hash;
            unspentTxOut.txOutIndex = index;
            unspentTxOut.account = txout.account;
            unspentTxOut.amount = txout.amount;
            return unspentTxOut;
        });
        return newUnspentTxOut;
        // const index = 0
        // const utxo = new UnspentTxOut()
        // utxo.txOutId = hash
        // utxo.txOutIndex = index
        // utxo.account = txOuts[index].account
        // utxo.amount = txOuts[index].amount
        // return utxo
    }
}
exports.default = Unspent;
