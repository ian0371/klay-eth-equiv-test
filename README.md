# klay-eth equivalency test
## Settings

1. Create `.env` by copying `.sample-env`. Fill only the networks to test:
```
PRIVKEY_PRIVATE='~~~'
PRIVKEY_BAOBAB='~~~'
PRIVKEY_RINKEBY='~~~'
PRIVKEY_ROPSTEN='~~~'
INFURA_PROJECT_ID='~~~'
```

2. Make a symlink from hardhat:
```bash
cd hardhat && ln -s ../.env
```

3. Configure `config.js` appropriately. You can change network in this file.

4. Download truffle
```bash
npm install -g truffle
```

## Enable Magma fork
Add `"magmaCompatibleBlock":0` in `genesis.json`. Confirm that block's baseFeePerGas is non-zero.

## tests

### web3
Run following commands:
```bash
node web3/deploy.js
node web3/number.js
node web3/inc.js
node web3/reset.js
node web3/vt.js
```

### ethers
(optional) To log RPC calls, uncomment lines in `ethers/conf.js`:
```
provider.on('debug', (info) => {
    console.log(info.action);
    console.log(info.request);
    console.log(info.response);
    console.log(info.provider);
});
```

Run following commands:
```bash
node ethers/deploy.js
node ethers/number.js
node ethers/inc.js
node ethers/reset.js
node ethers/vt.js
```

### truffle

#### script test
(optional) To log RPC calls, add `--verbose-rpc` option to truffle commands.

Run following commands:
```bash
mkdir truffle
cd truffle
truffle unbox metacoin
cat > truffle-config.js << EOF
module.exports = {
  compilers: {
    solc: {
      version: "0.8.13",
      docker: true,
    }
  },
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8551,
      network_id: "*"
    },
    test: {
      host: "127.0.0.1",
      port: 8551,
      network_id: "*"
    }
  },
};
EOF

truffle deploy
truffle migrate

truffle test ./test/TestMetaCoin.sol

sed -i '' 's|accountTwo = .*|accountTwo = "0x000000000000000000000000000000000000dead"|g' test/metacoin.js
truffle test ./test/metacoin.js
```

#### console test
```bash
truffle migrate
truffle console
truffle(development)> let instance = await MetaCoin.deployed()
truffle(development)> let accounts = await web3.eth.getAccounts()
truffle(development)> let balance = await instance.getBalance(accounts[0])
truffle(development)> balance.toNumber()

truffle(development)> let ether = await instance.getBalanceInEth(accounts[0])
truffle(development)> ether.toNumber()

truffle(development)> accounts.push('0x000000000000000000000000000000000000dead')
truffle(development)> instance.sendCoin(accounts[1], 500)

truffle(development)> let received = await instance.getBalance(accounts[1])
truffle(development)> received.toNumber()

truffle(development)> let newBalance = await instance.getBalance(accounts[0])
truffle(development)> newBalance.toNumber()
```

### hardhat
Run following commands:
```bash
cd hardhat
npx hardhat faucet
npx hardhat test
```

## How to increase base fee during above tests
- Change the "rich key" in `hardhat.config.js`. This is to avoid using the same nonce between the gas fee increaser (using an infinite loop of value transfer).
- Lower the gas target using `governance.vote('kip71.gastarget', '200000')`. It may take long if `epoch` is large.
- Run `cd hardhat && npx hardhat faucet` to top up hardhat accounts
- In a window, we will be executing an infinite value transfer thread. Run:
```
cd hardhat && npx hardhat vt
```
- In another window, run the desired test. For example:
```
cd truffle && truffle migrate
```

## EIP-155 test
```
cd hardhat
npx hardhat faucet
npx hardhat opensea
```
