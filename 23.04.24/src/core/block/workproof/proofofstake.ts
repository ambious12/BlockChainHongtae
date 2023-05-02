import { IBlock } from '../block.interface'
import { Proof } from './workproof.interface'

class ProofOfStake implements Proof {
    execute(): IBlock {
        // POS lOGIC 구현
        console.log('POS 실행')
        return {} as IBlock
    }
}
export default ProofOfStake
