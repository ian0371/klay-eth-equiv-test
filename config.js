require('dotenv').config();

const config = {
    private: {
        network:      'private',
        rpcURL:       "http://localhost:8551",
        privKey:      process.env.PRIVKEY_PRIVATE || '000000000000000000000000000000000000000000000000000000000000dead',
        rich:         process.env.PRIVKEY_PRIVATE_RICH || '000000000000000000000000000000000000000000000000000000000000dead',
    },
    baobab:  {
        network:      'baobab',
        rpcURL:       "https://api.baobab.klaytn.net:8651",
        privKey:      process.env.PRIVKEY_BAOBAB || '000000000000000000000000000000000000000000000000000000000000dead',
        rich:         process.env.PRIVKEY_BAOBAB_RICH || '000000000000000000000000000000000000000000000000000000000000dead',
    },
    ethereum: {
        network:      'mainnet',
        rpcURL:       "https://mainnet.infura.io/v3/" + process.env.INFURA_PROJECT_ID,
        privKey:      process.env.PRIVKEY_ETHEREUM || '000000000000000000000000000000000000000000000000000000000000dead',
        rich:         process.env.PRIVKEY_PRIVATE_RICH || '000000000000000000000000000000000000000000000000000000000000dead',
    },
    rinkeby: {
        network:      'rinkeby',
        rpcURL:       "https://rinkeby.infura.io/v3/" + process.env.INFURA_PROJECT_ID,
        privKey:      process.env.PRIVKEY_RINKEBY || '000000000000000000000000000000000000000000000000000000000000dead',
        rich:         process.env.PRIVKEY_RINKEBY_RICH || '000000000000000000000000000000000000000000000000000000000000dead',
    },
    ropsten: {
        network:      'ropsten',
        rpcURL:       "https://ropsten.infura.io/v3/" + process.env.INFURA_PROJECT_ID,
        privKey:      process.env.PRIVKEY_ROPSTEN || '000000000000000000000000000000000000000000000000000000000000dead',
        rich:         process.env.PRIVKEY_ROPSTEN_RICH || '000000000000000000000000000000000000000000000000000000000000dead',
    }
};
const network = 'private';

module.exports = {
    config,
    network,
};
