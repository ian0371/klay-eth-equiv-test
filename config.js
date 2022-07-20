require('dotenv').config();

const config = {
    private: {
        network:      'private',
        rpcURL:       "http://localhost:8551",
        privKey:      process.env.PRIVKEY_PRIVATE,
    },
    baobab:  {
        network:      'baobab',
        rpcURL:       "https://api.baobab.klaytn.net:8651",
        privKey:      process.env.PRIVKEY_BAOBAB,
    },
    rinkeby: {
        network:      'rinkeby',
        rpcURL:       "https://rinkeby.infura.io/v3/" + process.env.INFURA_PROJECT_ID,
        privKey:      process.env.PRIVKEY_RINKEBY,
    },
    ropsten: {
        network:      'ropsten',
        rpcURL:       "https://ropsten.infura.io/v3/" + process.env.INFURA_PROJECT_ID,
        privKey:      process.env.PRIVKEY_ROPSTEN,
    }
};
const network = 'private';

module.exports = {
    config,
    network,
};
