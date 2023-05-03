import Block from './block/block'
import Chain from './chain/chain'
import Transaction from './transaction/transaction'
import Unspent from './transaction/unspant'

class IngChain {
    constructor(
        private readonly chain: Chain,
        private readonly block: Block,
        private readonly transaction: Transaction,
        private readonly unspent: Unspent
    ) {}

    mineBlock(account: string) {
        // 이전블록 , 트랜잭션 , 10번째 블록
        const latestBlock = this.chain.latestBlock()
        const adjustmentBlock = this.chain.getAdjustmentBlock()

        const coinbase = this.transaction.createCoinBase(account, latestBlock.height)
        const newBlock = this.block.createBlock(latestBlock, [coinbase], adjustmentBlock)
        this.chain.addToChain(newBlock)

        console.log(`블럭이 생성..되었습니다!`)
        this.unspent.sync(newBlock.data)
        // Block이 생성이 되었다는건 block.data -> TransactionData
        console.log(this.unspent.getUnspentTxPool())
        return this.chain.latestBlock()
    }

    sendTransaction() {}

    getBalance(account: string) {
        const myUnspentTxOuts = this.unspent.me(account)
        const balance = this.unspent.getAmount(myUnspentTxOuts)
        return balance
    }
}

export default IngChain
