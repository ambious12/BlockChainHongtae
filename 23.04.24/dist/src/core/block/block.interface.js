"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IBlock = exports.BlockData = exports.BlockInfo = void 0;
class BlockInfo {
    constructor() {
        this.nonce = 0;
        this.difficulty = 0;
    }
}
exports.BlockInfo = BlockInfo;
class BlockData extends BlockInfo {
}
exports.BlockData = BlockData;
class IBlock extends BlockData {
}
exports.IBlock = IBlock;
