# BitCoin

블록체인 생태계..

-   백서 ? 문서같은거
    -> 토대로 비트코인 구현

1. TCP
2. 비트단위의 연산
3. 시간

비트코인의 목적 ?

-   순수한 개인 대 개인 금융기간을 거치지않고 , A - B에게 온라인 결제를 실현
    > 전자서명
    > 이중지불 막음
    > 이중지불 막기위해? 작업증명이 나옴

거래 <- 흐름을 알아야함

## 암호화..

byte , bit
16진수
2진수

`asdf` -> sha256

> 32byte 64글자

!!! 진짜 시작 !!!

# 1. typescript 설정

```sh
npm init -y
npm install -D typescript tsc-alias ts-node tsconfig-paths nodemon
```

## 2. jest 설정

TDD ? 개발방법론(단위테스트)
jest ? 프레임워크
-> 만든사람들이 메타.. 기본환경이 브라우저.. NodeJS 하려면 설정 많이바꿔야해
-> Jest ? 실행기임
-> 기본적으로 Node환경 Javascript로 런타임돌림.. 그래서 ts로 설정해주어야함
-> ts-jest가 typescript으로 jest를 실행시켜주겠다 라는것임..

// @types/jest : 타입만 모아둔 라이브러리

```sh
npm install -D jest @types/jest ts-jest
```

```
npx jest --preset ts-jest
```

-> 환경변수 많아지니까 (jest) jest.config.json 파일 만들기
-> 결국 package.json 에 넣었따..
-> Mock함수

# BlockChain

`Block`

제네시스 블록 :

```sh
npm install crypto-js @types/crypto-js merkle @types/merkle
```

# 04.26 Block 생성

test
