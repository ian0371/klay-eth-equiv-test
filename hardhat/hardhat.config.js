/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config({ path: '../.env' });
const { config, network } = require('../config');
const { Transaction } = require('@ethereumjs/tx');
require("@nomiclabs/hardhat-ethers");

async function vt(to, value) {
  const rich = new hre.ethers.Wallet(hre.network.config.rich, hre.ethers.provider);
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
      console.log(`[${('00' + i.toString()).slice(-2)}] ${account.address}: ${(balance / 1e18).toString().padStart(8)}`);
    }
  });

task("vt", "Infinite value transfer")
  .setAction(async () => {
    while (true) {
      tx = await vt('0x000000000000000000000000000000000000dead', '100');
      console.log(`sent`, tx.hash);
    }
  });

task("decode", "decode raw tx")
  .setAction(async () => {
    const tx = Transaction.fromRlpSerializedTx(openseaConst.DEPLOY_CREATE2_ADDRESS);
    console.log(tx.toJSON());
  });

task("faucet", "faucet")
  .setAction(async () => {
    const rich = new hre.ethers.Wallet(hre.network.config.rich, hre.ethers.provider);
    console.log("rich:", rich.address);
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
      rich: config.private.rich,
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
      rich: config.baobab.rich,
      accounts: [
        config.baobab.privKey,
      ],
    },
    'ethereum': {
      url: config.ethereum.rpcURL,
      rich: config.ethereum.rich,
      accounts: [
        config.ethereum.privKey,
      ],
    },
  },
};
