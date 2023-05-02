import { BLOCK_GENERATION_INTERVAL, DIFFICULTY_ADJUST_INTERVAL } from '@constants/block.constants'
import CryptoModule from '@core/crypto/crypto.module'
import { IBlock } from '../block.interface'
import { DifficultyProps, Proof, ProofOfWorkProps } from './workproof.interface'

class ProofOfWork implements Proof {
    constructor(private readonly crypto: CryptoModule) {}
    execute(props: ProofOfWorkProps): IBlock {
        // {blockdata,adjustmentBlock}
        // POW LOGIC 구현!
        const { blockData, adjustmentBlock } = props
        let block: IBlock = { ...blockData, hash: '' }

        do {
            block.nonce += 1
            block.timestamp = new Date().getTime()
            const difficultyProps = this.getDifficultyProps(block, adjustmentBlock)
            block.difficulty = this.getDifficulty(difficultyProps) // method 나온 결과물 넣을거임 ex) this.getDifficulty
            block.hash = this.crypto.createBlockHash(block)
        } while (!this.crypto.hashToBinary(block.hash).startsWith('0'.repeat(block.difficulty)))

        // 연산 로직구현
        // blockData.nonce = blockData.nonce + 1
        // blockData.timestamp = new Date().getTime()
        // blockData.difficulty = ?
        // difficulty 로직.. 시간차이..
        // blockData.hash = SHA256 <-- crypto -> return hex
        // hex -> binary ---> blockData.difficulty 비교
        // binary 0이 몇개? blockData.difficulty값이랑 같니?
        // return blockData + hash as IBlock

        console.log('POW 실행')
        return block as IBlock
    }

    getDifficultyProps(block: IBlock, adjustmentBlock: IBlock): DifficultyProps {
        const { height, timestamp: currentTime } = block
        const { difficulty, timestamp: adjTime } = adjustmentBlock

        return {
            height,
            currentTime,
            adjTime,
            difficulty,
        }
    }

    // getDifficulty 필요한 매개변수?
    // 블록높이 , 이전블록의 난이도, 현재블록 timestamp , 10번째전의 timestamp

    getDifficulty(props: DifficultyProps): number {
        const { height, currentTime, adjTime, difficulty } = props

        if (height <= 0) throw new Error('높이가 0이 들어왔습니다.')
        if (height < 10) return 0
        if (height < 20) return 1

        if (height % DIFFICULTY_ADJUST_INTERVAL !== 0) return difficulty

        const timeTaken = currentTime - adjTime // 총걸린 시간
        const timeExcepted = BLOCK_GENERATION_INTERVAL * DIFFICULTY_ADJUST_INTERVAL // 6000 / 2 -> 3000

        if (timeTaken < timeExcepted / 2) return difficulty + 1
        if (timeTaken < timeExcepted * 2) return difficulty - 1
        return difficulty

        // Logic : Block Height가 20이하일경우에는 별로 체크하고 싶지 않다.
        // 만드려고 하는 Block Height가 10의 배수가 아닐경우에는 그냥 10번째전 블록 난이도로 설정
        // 현재 블록 생성시간 - 10번째 이전의 블록 생성시간을 = 총걸린시간
        // 목표 시간 1블럭당 10분 100분 - 목표시간
        // 만약에 총걸린시간 < 목표시간/2 - 이전블록.난이도 + 1
        // 만약에 총걸린시간 > 목표시간*2 - 이전블록.난이도 - 1
        // 비슷하면 ? 이전블록.난이도 그대로..
    }
}
export default ProofOfWork
