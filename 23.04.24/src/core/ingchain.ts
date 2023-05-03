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
        const latestBlock = this.chain.latestBlock() // 최근생성된 블럭
        const adjustmentBlock = this.chain.getAdjustmentBlock() // 제네시스 블럭

        /*
        coinbase -> TransactionRow{
            txIns: [
                {
                    txOutId?: undefined
                    txOutIndex!: 9
                    signature?: undefined
                }
            ]
            txOuts: [
                {
                    account!: "0x0000"
                    amount!: 50
                }
            ]
            hash: "askljdlkasjfl1230981ojd09812"
    }
        */
        const coinbase = this.transaction.createCoinBase(account, latestBlock.height)
        const newBlock = this.block.createBlock(latestBlock, [coinbase], adjustmentBlock)
        this.chain.addToChain(newBlock)
        console.log('chain addToChain ::', newBlock.data)
        console.info(`블럭이 생성..되었습니다!`)
        this.unspent.sync(newBlock.data)
        // Block이 생성이 되었다는건 block.data -> TransactionData
        // console.log(this.unspent.getUnspentTxPool())
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
