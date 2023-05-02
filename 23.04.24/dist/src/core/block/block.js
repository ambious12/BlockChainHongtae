"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_constants_1 = require("@constants/block.constants");
const block_interface_1 = require("./block.interface");
class Block {
    constructor(crypto, workProof) {
        this.crypto = crypto;
        this.workProof = workProof;
    }
    createBlock(previousBlock, data, adjustmentBlock) {
        const blockData = this.createBlockData(previousBlock, data);
        // block hash 만드는것이 -> 블럭생성과 같음
        // block hash 만들때 조건이 붙음.
        // hash의 앞에 0이 몇개붙었냐가 조건임 hex값이 -> binary로 바뀌었을때 0이 몇개붙었는가
        // block 생성 시간 기준으로 , 블록1개생성 기준을 10분으로 잡을거임.
        // 1 2 3 4 5 6 7 8 9 10 <- 난이도 안정하고
        // 11부터 난이도 조정
        const newBlock = this.workProof.run(blockData, adjustmentBlock);
        return newBlock;
        // POW , POS
        // 증명로직
        // OOP 개념중 하나인 전략패턴!!!!!!!!!!!
        // 로그인 /Javascript , login -> login''
        // ------------------------------ //
        // 로직(작업증명)
        // POW / POS / POA ...
        // 우리 구현은 POW로 진행할거임
        // POW (Proof of Work) - 작업증명
        // POS (Proof of Stake) - 지분증명
        // POA (Proof of Authority) - 권한증명
        // 블록체인
        //  - public
        //  - private
        //    -  하이퍼레저
        // ------------------------------ //
    }
    isValidBlock(block) {
        // block에 있는 hash값이 hash형태와 일치한가?
        // cryto.createBlockHash() == block.hash
        this.crypto.isValidHash(block.hash);
        const validHash = this.crypto.createBlockHash(block);
        if (validHash !== block.hash)
            throw new Error(`블록해시값이 올바르지 않습니다. hash :: ${validHash} ${block.hash} `);
    }
    // blockData 얻으러면
    //  1. createBlockInfo <-- 이전블럭 필요
    //  2. createBlockData 호출하는데 , createBlockInfo() 결과물을 넣어주고 transaction[] 도 필요?
    createBlockData(previousBlock, data) {
        // 1. blockInfo 값받기
        const blockinfo = this.createBlockInfo(previousBlock);
        return Object.assign(Object.assign({}, blockinfo), { merkleRoot: this.crypto.merkleRoot(data), data });
    }
    createBlockInfo(previousBlock) {
        // const blockInfo:BlockInfo = {
        //     version: VERSION,
        //     height: previousBlock.height + 1,
        //     timestamp: new Date().getTime(),
        //     previousHash: previousBlock.hash,
        //     nonce: 0,
        //     difficulty: 0
        // }
        // previousBlock Hash
        this.isValidBlock(previousBlock); // 이전블록이 올바른지 확인하는작업
        const blockInfo = new block_interface_1.BlockInfo();
        blockInfo.version = block_constants_1.VERSION;
        blockInfo.height = previousBlock.height + 1;
        blockInfo.timestamp = new Date().getTime();
        blockInfo.previousHash = previousBlock.hash;
        return blockInfo;
    }
}
exports.default = Block;
