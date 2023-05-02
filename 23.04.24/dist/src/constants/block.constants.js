"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GENESIS = exports.DIFFICULTY_ADJUST_INTERVAL = exports.BLOCK_GENERATION_INTERVAL = exports.VERSION = void 0;
exports.VERSION = '1.0.0';
exports.BLOCK_GENERATION_INTERVAL = 10 * 60;
exports.DIFFICULTY_ADJUST_INTERVAL = 10;
exports.GENESIS = {
    version: '1.0.0',
    height: 1,
    timestamp: 1231006506,
    previousHash: '0'.repeat(64),
    merkleRoot: 'DC24B19FB7508611ACD8AD17F401753670CFD8DD1BEBEF9C875125E98D82E3D8',
    nonce: 0,
    difficulty: 0,
    hash: '84ffab55c48e36cc480e2fd4c4bb0dc5ee1bb2d41a4f2a78a1533a8bb7df8370',
    data: '2009년 1월 3일 더 타임스, 은행들의 두번째 구제금융을 앞두고 있는 U.K 재무장관',
};
