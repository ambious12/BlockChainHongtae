"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const elliptic_1 = __importDefault(require("elliptic"));
// npm install elliptic
class DigitalSignature {
    constructor(crypto) {
        this.crypto = crypto;
        this.ec = new elliptic_1.default.ec('secp256k1');
    }
    // 개인키 만들기
    createPrivateKey() {
        return (0, crypto_1.randomBytes)(32).toString('hex');
    }
    // 공개키 만들기
    createPublicKey(privateKey) {
        const keyPair = this.ec.keyFromPrivate(privateKey);
        const publicKey = keyPair.getPublic().encode('hex', true); // 32byte(public Data) + 1byte(02 , 03):암호화 사용했다..
        return publicKey;
    }
    createAccount(publicKey) {
        const buffer = Buffer.from(publicKey);
        const account = buffer.slice(26).toString();
        return account;
    }
    sign(privateKey, receipt) {
        const keyPair = this.ec.keyFromPrivate(privateKey);
        const receiptHash = this.crypto.createReceiptHash(receipt);
        const signature = keyPair.sign(receiptHash, 'hex').toDER('hex');
        receipt.signature = signature;
        return receipt;
    }
    verify(receipt) {
        // 공개키 , 서명 , 평문 으로 verify!
        const { sender: { publicKey }, signature, } = receipt;
        if (!publicKey || !signature)
            throw new Error('receipt 내용이 올바르지 않습니다.');
        const receiptHash = this.crypto.createReceiptHash(receipt);
        return this.ec.verify(receiptHash, signature, this.ec.keyFromPublic(publicKey, 'hex'));
    }
}
exports.default = DigitalSignature;
