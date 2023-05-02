"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WorkProof {
    constructor(proof) {
        this.proof = proof;
    }
    run(blockData, adjustmentBlock) {
        const props = {
            blockData,
            adjustmentBlock,
        };
        return this.proof.execute(props);
    }
}
// const proof = new ProofOfState()
// const proof = new ProofOfWork()
// new WorkProof(proof)
exports.default = WorkProof;
