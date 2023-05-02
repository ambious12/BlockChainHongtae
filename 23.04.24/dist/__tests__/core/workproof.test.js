"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const proofofstake_1 = __importDefault(require("@core/block/workproof/proofofstake"));
const proofofwork_1 = __importDefault(require("@core/block/workproof/proofofwork"));
const wokrproof_1 = __importDefault(require("@core/block/workproof/wokrproof"));
describe('WorkProof', () => {
    let workProof;
    let proof;
    describe('ProofOfWork', () => {
        beforeEach(() => {
            proof = new proofofwork_1.default();
            workProof = new wokrproof_1.default(proof);
        });
        it('console.log 찍히나?', () => {
            workProof.run();
        });
    });
    describe('ProofOfStake', () => {
        beforeEach(() => {
            proof = new proofofstake_1.default();
            workProof = new wokrproof_1.default(proof);
        });
        it('console.log 찍히나?', () => {
            workProof.run();
        });
    });
});
