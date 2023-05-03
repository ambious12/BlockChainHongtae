import CryptoModule from '@core/crypto/crypto.module'
import DigitalSignature from '@core/wallet/digitalSignature'
import { Receipt } from '@core/wallet/wallet.interface'

describe('디지털 서명 이해하기!!', () => {
    let digitalSignature: DigitalSignature
    let crypto: CryptoModule

    beforeEach(() => {
        const crypto = new CryptoModule()
        digitalSignature = new DigitalSignature(crypto)
    })

    describe('createPrivateKey', () => {
        it('개인키 생성하기', () => {
            const privateKey = digitalSignature.createPrivateKey()
            expect(privateKey).toHaveLength(64)
        })
    })

    describe('createPublicKey', () => {
        it('공개키 생성하기', () => {
            const privateKey = digitalSignature.createPrivateKey()
            const publicKey = digitalSignature.createPublicKey(privateKey)
            console.log('public Key : ', publicKey)
            console.log('publicKey2 ::: ', digitalSignature.createPublicKey(privateKey))
            expect(publicKey).toHaveLength(66) // 64 X 66 O 앞에 02 또는 03
        })
    })

    describe('createAccount', () => {
        it('계정 생성하기', () => {
            const privateKey = digitalSignature.createPrivateKey()
            const publicKey = digitalSignature.createPublicKey(privateKey)
            const account = digitalSignature.createAccount(publicKey)

            console.log(account, publicKey)
            // 02052d9b2bdba38047f424c75a2ee63bd444f4d383f4c9d6ade297d7e375a8cbac -> publicKey
            // 2ee63bd444f4d383f4c9d6ade297d7e375a8cbac -> account
            // 앞을 날리는게 이더리움의 account 규칙
            // {2ee63bd444f4d383f4c9d6ade297d7e375a8cbac : 02052d9b2bdba38047f424c75a2ee63bd444f4d383f4c9d6ade297d7e375a8cbac}
            expect(account).toHaveLength(40)
        })
    })

    describe('서명', () => {
        let sender_privateKey: string
        let sender_publicKey: string
        let sender_account: string

        let received_privateKey: string
        let received_publicKey: string
        let received_account: string

        let receipt: Receipt

        beforeEach(() => {
            sender_privateKey = digitalSignature.createPrivateKey()
            sender_publicKey = digitalSignature.createPublicKey(sender_privateKey)
            sender_account = digitalSignature.createAccount(sender_publicKey)

            received_privateKey = digitalSignature.createPrivateKey()
            received_publicKey = digitalSignature.createPublicKey(received_privateKey)
            received_account = digitalSignature.createAccount(received_publicKey)

            receipt = {
                sender: {
                    account: sender_account,
                    publicKey: sender_publicKey,
                },
                received: received_account,
                amount: 30,
            }
        })

        it('sign 만들기', () => {
            const signature = digitalSignature.sign(sender_privateKey, receipt)
            console.log(signature)
            // 30450220 :::: DER
            // 0x30 DER 형태
            // 0x45 전체 바이트를 나타냄
            // 0x02 R값을 시작하는 바이트
            // 0x20 R값의 길이를 나타내는 바이트
            // 30450220465058d45612bf55d6a70745bd666f829804e3a4be715c9d3602e19f60aceedd022100ead7918a8a5550f7c68f2698d129c7a1261edce21829debb53a76b8403d02ba6
            // 465058d45612bf55d6a70745bd666f829804e3a4be715c9d3602e19f60aceedd022100ead7918a8a5550f7c68f2698d129c7a1261edce21829debb53a76b8403d02ba6
            // {
            //     r:d45612bf55d6a70745bd666f82980
            // } 이런식으로 객체로 표현된것을 string으로 나열한거.
            // 다 의미가 있는 값이다. 서명값은 string , 객체가 될수있음.
            expect(typeof signature).toBe('object')
            expect(typeof signature.signature).not.toBe(undefined)
        })
        it('검증', () => {
            const receipt2 = digitalSignature.sign(sender_privateKey, receipt)

            // receipt.amount = 50 //보내는 양을 바꿔보겠음

            // 블록체인에게 receipt2 를 넘겨준거임.
            // receipt2.signature = receipt2.signature + 'sad' 서명이 올바르지않다 라고 에러!
            const bool = digitalSignature.verify(receipt2)
            console.log(bool)
        })
    })
})

describe('디지털서명', () => {
    // 개인키 생성
    // 길이가 64인지 , 2번실행했을때 다른값 떨어지는지..
})
