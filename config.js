require('dotenv').config();

const config = {
    private: {
        network: 'private',
        rpcURL: "http://127.0.0.1:8551",
        privKey: process.env.PRIVKEY_PRIVATE || '000000000000000000000000000000000000000000000000000000000000dead',
        rich: process.env.PRIVKEY_PRIVATE_RICH || '000000000000000000000000000000000000000000000000000000000000dead',
    },
    baobab: {
        network: 'baobab',
        rpcURL: "https://api.baobab.klaytn.net:8651",
        privKey: process.env.PRIVKEY_BAOBAB || '000000000000000000000000000000000000000000000000000000000000dead',
        rich: process.env.PRIVKEY_BAOBAB_RICH || '000000000000000000000000000000000000000000000000000000000000dead',
    },
    ethereum: {
        network: 'mainnet',
        rpcURL: "https://mainnet.infura.io/v3/" + process.env.INFURA_PROJECT_ID,
        privKey: process.env.PRIVKEY_ETHEREUM || '000000000000000000000000000000000000000000000000000000000000dead',
        rich: process.env.PRIVKEY_PRIVATE_RICH || '000000000000000000000000000000000000000000000000000000000000dead',
    },
    goerli: {
        network: 'goerli',
        rpcURL: "https://goerli.infura.io/v3/" + process.env.INFURA_PROJECT_ID,
        privKey: process.env.PRIVKEY_GOERLI || '000000000000000000000000000000000000000000000000000000000000dead',
        rich: process.env.PRIVKEY_GOERLI_RICH || '000000000000000000000000000000000000000000000000000000000000dead',
    },
};
const network = 'private';

module.exports = {
    config,
    network,
};
