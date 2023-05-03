"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const block_constants_1 = require("@constants/block.constants");
const block_1 = __importDefault(require("@core/block/block"));
const proofofwork_1 = __importDefault(require("@core/block/workproof/proofofwork"));
const wokrproof_1 = __importDefault(require("@core/block/workproof/wokrproof"));
const crypto_module_1 = __importDefault(require("@core/crypto/crypto.module"));
const digitalSignature_1 = __importDefault(require("@core/wallet/digitalSignature"));
const transaction_1 = __importDefault(require("@core/transaction/transaction"));
const unspant_1 = __importDefault(require("@core/transaction/unspant"));
const wallet_1 = __importDefault(require("@core/wallet/wallet"));
console.log('hello bitcoin sample');
// blcok을 100 , 1000개 그리기
const crypto = new crypto_module_1.default();
const digitalSignature = new digitalSignature_1.default(crypto);
const proofofwork = new proofofwork_1.default(crypto);
const workProof = new wokrproof_1.default(proofofwork);
const block = new block_1.default(crypto, workProof);
const transaction = new transaction_1.default(crypto);
const unspent = new unspant_1.default(transaction);
const accounts = new wallet_1.default(digitalSignature);
const sender = accounts.create();
console.log('sender ::: ', sender);
const recipt = accounts.receipt('0000', 30);
console.log('getAccounts() :: ', accounts.getAccounts());
/**
const block1 = block.createBlock(GENESIS, 'asdfasdf', GENESIS)
console.log(block1)

// 반복문을 통해서 블럭을 100개를 만들고, 100개를 배열에 담기
// -> POW가 정확히 잘되고있는지 한번 검증!
// -> 된다면 test code 작성..

const blockArr = [GENESIS]

for (let i = 1; i < 100; i++) {
    if (i < 19) {
        const newBlock = block.createBlock(blockArr[i - 1], 'adsfasdf', GENESIS)
        blockArr.push(newBlock)
    }
    if (i >= 19) {
        const blockNumber = Math.floor(i / 10) * 10 - 10
        const newBlock = block.createBlock(blockArr[i - 1], 'asdfasdf', blockArr[blockNumber])
        blockArr.push(newBlock)
    }
}

console.log('blockArr :: ', blockArr)

 */
// 블록 -> 체인 -> 통신 -> p2p -> 트랜잭션 -> 지갑 이렇게했는데 이제는
// 블록 -> 트랜잭션 -> 체인 -> p2p
///====== 납득이 ====== //
// 제네시스
// 코인베이스
// const privateKey = digitalSignature.createPrivateKey()
// console.log(privateKey)
/** */
const privateKey = '3f90734e9349e0f0dc7e3c50473924b6e48e0a8f0d17e91af73fc6b88d7239e5';
const publicKey = digitalSignature.createPublicKey(privateKey);
const account = digitalSignature.createAccount(publicKey);
// Tx
const coinbase2 = transaction.createCoinBase(account, block_constants_1.GENESIS.height);
unspent.createUTXO(coinbase2);
// console.log(unspent.getUnspentTxPool())
const block2 = block.createBlock(block_constants_1.GENESIS, [coinbase2], block_constants_1.GENESIS);
// #3
// 이전블럭 : 높이가 2인블럭
// 10번째 전 블럭 : 제네시스
// 3번째 블럭에 Transaction 넣기 ( Transaction 넣으려면 Receipt 영수증 필요! )
const receipt = {
    sender: {
        // 보내는사람
        account,
        publicKey,
    },
    received: '0'.repeat(40),
    amount: 30,
    signature: '0000',
};
const flag = unspent.isAmount(account, receipt.amount);
if (flag)
    console.log('잔액부족');
// createRow ? TxIn  TxOut
// TxIn
// TxOut
// 현재 보내는사람은 50
// 받는사람은 30
// 보내는사람의 잔액은 20
// sender 총 수량 - amount
// TxIn ? 미사용 객체에서부터 만들어진것, -> unspent
// unspent.getUnspentTxPool() 에서부터 sender입장에서 보낼 미사용객체를 뽑아야 함
// 보낼사람의 미사용객체 뽑기
// 내가 보낼 amount값이랑 얼추 비슷한 금액을 만들어야함
const txin1 = unspent.getInput(receipt);
const txout1 = unspent.getOutput(receipt);
// const txout_sender = transaction.createTxOut(receipt.sender.account, 50 - receipt.amount)
// const txout_recevied = transaction.createTxOut(receipt.received, receipt.amount)
const tx1 = transaction.createRow(txin1, txout1);
console.log('index :::', unspent.delete(txin1[0]));
unspent.createUTXO(tx1);
console.log('tx1 :: ', tx1);
console.log(unspent.getUnspentTxPool());
// ----- 위의 코드는 transaction 만들고싶음 ------
// const tx2 = transaction.create(receipt)
// ----- 위의 코드는 transaction 만들고싶음 ------
const coinbase3 = transaction.createCoinBase(account, block2.height);
const block3 = block.createBlock(block2, [coinbase3, tx1], block_constants_1.GENESIS);
console.log(block3);
// -> sender : 70
// -> received : 30
///====== 납득이 ====== //
// 영수증 -> transaction -> block 생성
// 50
// 20 30
// const txin = transaction.createTxIn()
// const txout = transaction.createTxOut()
// transaction.createRow()
// account 만들어야해, 개인키 만들어서 공개키 만들고 어카운트
// GENESIS
// block2 coinbase
// block3 coinbase + transaction 1건에대한 부분도 넣자.
