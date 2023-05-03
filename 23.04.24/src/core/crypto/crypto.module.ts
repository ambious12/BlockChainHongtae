import { Hash } from 'types/block'
import cryptojs from 'crypto-js'
import merkle from 'merkle'
import { TransactionData, TransactionRow } from '@core/transaction/transaction.interface'
import { BlockData, BlockInfo } from '@core/block/block.interface'
import { Receipt } from '@core/wallet/wallet.interface'

class CryptoModule {
    // SHA256
    createBlockHash(data: BlockData) {
        // const value = Object.values(data).sort().join('')
        const { version, height, timestamp, merkleRoot, previousHash, difficulty, nonce } = data
        const value = `${version}${height}${timestamp}${merkleRoot}${previousHash}${difficulty}${nonce}`
        return this.SHA256(value)
    }

    createReceiptHash(receipt: Receipt) {
        const {
            sender: { publicKey },
            received,
            amount,
        } = receipt

        const message = [publicKey, received, amount].join('')
        return this.SHA256(message)
    }

    SHA256(data: string): Hash {
        const hash = cryptojs.SHA256(data).toString()
        return hash
    }
    // 16진수 변환하기 쉬우니까
    // 00 -> 16진수
    // 00000000
    // ex) hash : 'aabb'
    hashToBinary(hash: Hash): string {
        let binary = ''
        for (let i = 0; i < hash.length; i += 2) {
            const hexByte = hash.substr(i, 2) // aa
            const decimal = parseInt(hexByte, 16)
            const binaryByte = decimal.toString(2).padStart(8, '0') // 10101010
            binary += binaryByte
        }
        return binary
    }
    // npm install merkle && npm install @types/merkle
    merkleRoot(data: TransactionData) {
        if (typeof data === 'string') {
            return merkle('sha256').sync([data]).root()
        } else if (Array.isArray(data)) {
            // data -> [{hash},{hash},{hash},...]
            // [{hash:'0x123},{hash:'asdff}]
            const sync = data
                .filter((v: TransactionRow) => {
                    if (!v.hash) return false
                    else this.isValidHash(v.hash)
                    return true
                })
                .map((v) => v.hash) as string[]
            return merkle('sha256').sync(sync).root()
            // ['asdf','asdsaf','sadafas','fefqqd']
        }

        // if (data instanceof TransactionRow) {
        //     // data type : transactionRow
        // } else {
        //     // data type : string
        //     return merkle('sha256').sync([data]).root()
        // }
    }

    isValidHash(hash: Hash): void {
        const hexRegExp = /^[0-9a-fA-F]{64}$/
        if (!hexRegExp.test(hash)) {
            throw new Error(`해시값이 올바르지 않습니다. hash :  ${hash}`)
        }
    }
}

export default CryptoModule
