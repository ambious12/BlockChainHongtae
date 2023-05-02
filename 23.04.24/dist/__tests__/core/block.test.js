"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const block_constants_1 = require("@constants/block.constants");
const block_1 = __importDefault(require("@core/block/block"));
const crypto_module_1 = __importDefault(require("@core/crypto/crypto.module"));
describe('Block', () => {
    let block;
    let crypto;
    beforeEach(() => {
        crypto = new crypto_module_1.default();
        block = new block_1.default(crypto);
    });
    describe('isValidBlock', () => {
        let previousBlock;
        beforeEach(() => {
            previousBlock = Object.assign({}, block_constants_1.GENESIS);
        });
        it('매개변수에 넘겨받은 블럭해쉬값이 올바른가?', () => {
            expect(() => {
                block.isValidBlock(previousBlock);
            }).not.toThrowError();
        });
        it('매개변수에 넘겨받은 블럭해쉬값이 올바르지 않을경우 에러가 나옴?', () => {
            previousBlock.hash = '0000';
            expect(() => {
                block.isValidBlock(previousBlock);
            }).toThrowError();
        });
        it('블록해시값이 변경된적이 있는가?', () => {
            expect(() => {
                block.isValidBlock(previousBlock);
            }).not.toThrowError();
        });
        it('블록해시값이 올바르지 않을때 에러가 발생되는가?', () => {
            previousBlock.hash = '84ffab55c48e36cc480e2fd4c4bb0dc5ee1bb2d41a4f2a78a1533a8bb7df8372'; // 맨뒤 0 -> 2
            expect(() => {
                block.isValidBlock(previousBlock);
            }).toThrowError();
        });
    });
    describe('createBlockInfo', () => {
        const previousBlock = block_constants_1.GENESIS;
        it('createBlock 존재하는가?', () => {
            expect(typeof block.createBlockInfo).toBe('function');
        });
        it('createBlock BlockInfo가 잘만들어 지는가?', () => {
            const newBlock = block.createBlockInfo(previousBlock);
            expect(typeof newBlock).toBe('object');
        });
        it('createBlock BlockInfo가 내용이 올바른가??', () => {
            const newBlock = block.createBlockInfo(previousBlock);
            expect(newBlock.previousHash).toBe(previousBlock.hash);
            expect(newBlock.height).toBe(previousBlock.height + 1);
        });
    });
});
