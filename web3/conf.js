const { config, network } = require('../config');
const { State } = require('../state');

const conf = config[network];
console.log('[*] Using network', network);

//  alchemy-web3
//const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
//const web3 = createAlchemyWeb3(conf.rpcURL);

const Web3 = require('web3');
const web3 = new Web3(conf.rpcURL);
const acc = web3.eth.accounts.privateKeyToAccount(conf.privKey);
var stateObj = new State();
var state = stateObj.state;

module.exports = {
    conf,
    web3,
    acc,
    stateObj,
    state,
};
