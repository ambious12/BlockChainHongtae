import { BlockData, IBlock } from '../block.interface'
import ProofOfWork from './proofofwork'
import { Proof, ProofProps } from './workproof.interface'

class WorkProof {
    constructor(private readonly proof: Proof) {}

    run(blockData: BlockData, adjustmentBlock: IBlock) {
        const props: ProofProps = {
            blockData,
            adjustmentBlock,
        }
        return this.proof.execute(props)
    }
}

// const proof = new ProofOfState()
// const proof = new ProofOfWork()

// new WorkProof(proof)

export default WorkProof
