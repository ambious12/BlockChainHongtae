"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Wallet {
    constructor(digitalSignature) {
        this.digitalSignature = digitalSignature;
        this.accounts = [];
    }
    create() {
        const privateKey = this.digitalSignature.createPrivateKey();
        const publicKey = this.digitalSignature.createPublicKey(privateKey);
        const account = this.digitalSignature.createAccount(publicKey);
        const accounts = {
            account,
            publicKey,
            privateKey,
        };
        this.accounts.push(accounts);
        return accounts;
    }
    set(privateKey) {
        const publicKey = this.digitalSignature.createPublicKey(privateKey);
        const account = this.digitalSignature.createAccount(publicKey);
        const accounts = {
            account,
            publicKey,
            privateKey,
        };
        this.accounts.push(accounts);
        return accounts;
    }
    getAccounts() {
        const accounts = this.accounts.map((v) => v.account);
        return accounts;
    }
    getPrivate(account) {
        return this.accounts.filter((v) => v.account === account)[0].account;
    }
    receipt(received, amount) {
        const { account, publicKey, privateKey } = this.accounts[0];
        const sender = {
            account,
            publicKey,
        };
        const receipt = this.digitalSignature.sign(privateKey, {
            sender,
            received,
            amount,
        });
        return receipt;
    }
    sign() { }
    verify() { }
}
exports.default = Wallet;
