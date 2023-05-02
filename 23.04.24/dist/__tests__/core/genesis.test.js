"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_constants_1 = require("@constants/block.constants");
describe('제네시스 블럭', () => {
    it('Genesis Block 형태가 올바른가 ?', () => {
        expect(block_constants_1.GENESIS.version).toBe('1.0.0');
        expect(block_constants_1.GENESIS.height).toBe(1);
        expect(block_constants_1.GENESIS.timestamp).toBe(1231006506);
        expect(block_constants_1.GENESIS.difficulty).toBe(0);
        expect(block_constants_1.GENESIS.nonce).toBe(0);
        expect(block_constants_1.GENESIS.hash).toBe('84ffab55c48e36cc480e2fd4c4bb0dc5ee1bb2d41a4f2a78a1533a8bb7df8370'); // 0 -> 64개 생김
        expect(block_constants_1.GENESIS.merkleRoot).toBe('DC24B19FB7508611ACD8AD17F401753670CFD8DD1BEBEF9C875125E98D82E3D8');
        expect(block_constants_1.GENESIS.previousHash).toBe('0'.repeat(64));
        expect(block_constants_1.GENESIS.data).toBe('2009년 1월 3일 더 타임스, 은행들의 두번째 구제금융을 앞두고 있는 U.K 재무장관');
    });
});
