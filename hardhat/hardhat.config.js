/** @type import('hardhat/config').HardhatUserConfig */
const { config, network } = require('../config');
const { Transaction } = require('@ethereumjs/tx');
const openseaConst = require('./opensea_const');
require("@nomiclabs/hardhat-ethers");

async function vt(to, value) {
  const rich = new hre.ethers.Wallet(hre.network.config.rich, hre.ethers.provider);
  console.log(rich.address, hre.network.config.rich);
  const tx = await rich.sendTransaction({
    to: to,
    value: value,
  });
  return tx;
}

task("accounts", "accounts")
.setAction(async () => {
  const accounts = await hre.ethers.getSigners();
  for (const [i, account] of accounts.entries()) {
    const balance = await account.getBalance();
    console.log(`[${('00'+i.toString()).slice(-2)}] ${account.address}: ${(balance / 1e18).toString().padStart(8)}` );
  }
});

task("vt", "Infinite value transfer")
.setAction(async () => {
  while (true) {
    tx = await vt('0x000000000000000000000000000000000000dead', '100');
    console.log(`sent`, tx.hash);
  }
});

task("opensea", "deploy Opensea using replay transaction")
.setAction(async () => {
  const rich = new hre.ethers.Wallet(hre.network.config.rich, hre.ethers.provider);

  // *** Factory setup on new chain
  // step 1
  var tx = await vt(openseaConst.KEYLESS_CREATE2_DEPLOYER_ADDRESS, '10000000000000000000');
  await hre.ethers.provider.waitForTransaction(tx.hash);

  // step 2
  tx = await hre.ethers.provider.sendTransaction(openseaConst.DEPLOY_CREATE2_ADDRESS);
  console.log('top up create2 deployer', tx.hash);

  // step 3
  tx = await rich.sendTransaction({
    to: openseaConst.KEYLESS_CREATE2_ADDRESS,
    data: openseaConst.DEPLOY_INEFFICIENT_IMMUTABLE_CREATE2_FACTORY_ADDRESS,
  });
  console.log('inefficient immutable create2 factory deployed', tx.hash);

  // step 4
  tx = await rich.sendTransaction({
    to: openseaConst.INEFFICIENT_IMMUTABLE_CREATE2_FACTORY_ADDRESS,
    data: openseaConst.DEPLOY_IMMUTABLE_CREATE2_FACTORY_ADDRESS,
  });
  console.log('immutable create2 factory deployed', tx.hash);

  // *** Deploying Seaport and ConduitController
  tx = await rich.sendTransaction({
    to: openseaConst.IMMUTABLE_CREATE2_FACTORY_ADDRESS,
    data: openseaConst.DEPLOY_CC,
  });
  console.log('ConduitController deployed', tx.hash);

  tx = await rich.sendTransaction({
    to: openseaConst.IMMUTABLE_CREATE2_FACTORY_ADDRESS,
    data: openseaConst.DEPLOY_SEAPORT,
  });
  console.log('Seaport 1.1 deployed', tx.hash);
});

task("decode", "decode raw tx")
.setAction(async () => {
  const tx = Transaction.fromRlpSerializedTx(openseaConst.DEPLOY_CREATE2_ADDRESS);
  console.log(tx.toJSON());
});

task("faucet", "faucet")
.setAction(async () => {
  const rich = new hre.ethers.Wallet(hre.network.config.rich, hre.ethers.provider);
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    await rich.sendTransaction({
      to: account.address,
      value: ethers.utils.parseEther("20000"),
    });
    console.log(`sent to ${account.address}`);
  }
});

module.exports = {
  solidity: "0.8.9",
  defaultNetwork: network,
  networks: {
    'hardhat': {
      loggingEnabled: true,
    },
    'private': {
      url: config.private.rpcURL,
      rich: config.private.privKey,
      accounts: {
        mnemonic: "test test test test test test test test test test test junk",
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
        passphrase: "",
      },
    },
    'baobab': {
      url: config.baobab.rpcURL,
      accounts: [
        config.baobab.privKey,
      ],
    },
    'ropsten': {
      url: config.ropsten.rpcURL,
      accounts: [
        config.ropsten.privKey,
      ],
    },
  },
};
