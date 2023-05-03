"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_constants_1 = require("@constants/block.constants");
// Chain ? 블럭을 저장하는 역할..
class Chain {
    constructor() {
        this.INTERVAL = block_constants_1.DIFFICULTY_ADJUST_INTERVAL;
        this.chain = [block_constants_1.GENESIS];
    }
    get() {
        return this.chain;
    }
    length() {
        return this.chain.length;
    }
    latestBlock() {
        return this.chain[this.length() - 1];
    }
    addToChain(receivedBlock) {
        this.chain.push(receivedBlock);
        return this.latestBlock();
    }
    isValid() { }
    replaceChain() { }
    getBlock(callbackFn) {
        const findBlock = this.chain.find(callbackFn);
        if (!findBlock)
            throw new Error('블럭을 못찾겠어요');
        return findBlock;
    }
    getBlockByHash(hash) {
        return this.getBlock((block) => block.hash === hash);
    }
    getBlockByHeight(height) {
        return this.getBlock((block) => block.height === height);
    }
    getAdjustmentBlock() {
        // Math.floor(height / INTERVAL) * INTERVAL
        const { height } = this.latestBlock();
        const findHeight = height < this.INTERVAL ? 1 : Math.floor(height / this.INTERVAL) * this.INTERVAL;
        return this.getBlockByHeight(findHeight);
    }
    serialize() {
        return JSON.stringify(this.chain);
    }
    deserialize(chunk) {
        return JSON.parse(chunk);
    }
}
const chain = new Chain();
exports.default = Chain;
