import { GENESIS } from '@constants/block.constants'
import { BlockData, BlockInfo } from '@core/block/block.interface'
import CryptoModule from '@core/crypto/crypto.module'

describe('CryptoModule', () => {
    let cryptoModule: CryptoModule

    beforeEach(() => {
        cryptoModule = new CryptoModule()
    })

    describe('SHA256', () => {
        it('SHA256에 인자내용을 평문으로해서 암호화가 되는가?', () => {
            const data = 'hello world!'
            const result = cryptoModule.SHA256(data)
            expect(result.length).toBe(64)
        })
    })

    describe('createBlockHash', () => {
        it('createBlockHash에서 BLOCKINFO 데이터로 암호화가 진행되는가 ?', () => {
            //blockinfo를 넣기전에 data속성을 빼기
            const blockinfo: BlockData = {
                version: GENESIS.version,
                height: GENESIS.height,
                timestamp: GENESIS.timestamp,
                previousHash: GENESIS.previousHash,
                merkleRoot: GENESIS.merkleRoot,
                nonce: GENESIS.nonce,
                difficulty: GENESIS.difficulty,
                data: '',
            }
            const hash = cryptoModule.createBlockHash(blockinfo)
            // console.log(hash)
            // 84ffab55c48e36cc480e2fd4c4bb0dc5ee1bb2d41a4f2a78a1533a8bb7df8370 값변경됨..
            expect(hash).toHaveLength(64)
        })
    })

    describe('HashToBinary : ', () => {
        it('이진데이터로 잘 변경 되는가 ? ', () => {
            const data = 'hash'
            const hash = cryptoModule.SHA256(data)

            // 1니블 -> 4bit
            // 16 1자리
            // ex) hello world 평문 -> hex -> binary
            const binary = cryptoModule.hashToBinary(hash) // 64글자
            // console.log(binary)
            expect(binary.length).toBe(256)
        })
    })

    describe('merkleRoot', () => {
        it('GENESIS 블럭에 있는 data값에서 merkleRoot 구하기', () => {
            const merkleroot = cryptoModule.merkleRoot(GENESIS.data)
            // console.log(merkleroot)
            expect(merkleroot).toHaveLength(64)
        })

        it('data값이 transactionRow[] 형태일경우 잘 생성되는가?', () => {
            const data = [
                { hash: 'DC24B19FB7508611ACD8AD17F401753670CFD8DD1BEBEF9C875125E98D3333D9' },
                { hash: 'DC24B19FB7508611ACD8AD17F401753670CFD8DD1BEBEF9C875125E98D333020' },
            ]
            const merkleroot = cryptoModule.merkleRoot(data)
            expect(merkleroot).toHaveLength(64)
        })

        it('data값이 올바르지 않을경우 에러가 발생하는가?', () => {
            const data = [
                { hash: 'DC24B19FB7508611ACD8AD17F401753670CFF9C875125E98D3333D9' },
                { hash: 'DC24B19FB7508611ACD8AD17F401753670CF9C875125E98D333020' },
            ]
            const merkleroot = cryptoModule.merkleRoot(data)
            expect(() => {
                cryptoModule.merkleRoot(data)
            }).toThrowError()
        })
    })

    describe('isValidHash', () => {
        it('Hash length 64 미만일경우', () => {
            const hash = 'DC24B19FB7508611ACD8AD17F401753670CFD8DD1BEBEF9C875125E98D82E3D' // 일부러 하나 지움 맨뒤에꺼
            expect(() => {
                cryptoModule.isValidHash(hash)
            }).toThrowError() // 에러가 터지면 성공이뜸
        })
        it('Hash값이 올바르지 않을경우 ', () => {
            const hash = 'DC24B19FB7508611ACD8AD17F401753670CFD8DD1BEBEF9C875125E98D82E3DG' // 일부러 하나 다르게함
            expect(() => {
                cryptoModule.isValidHash(hash)
            }).toThrowError() // 에러가 터지면 성공이뜸
        })
    })
})
