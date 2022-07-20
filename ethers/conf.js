const { config, network } = require('../config');
const { State } = require('../state');

const conf = config[network];
console.log('[*] Using network', network);

const ethers = require('ethers');
const provider = new ethers.providers.JsonRpcProvider(conf.rpcURL);
provider.on('debug', (info) => {
    //console.log(info.action);
    //console.log(info.request);
    //console.log(info.response);
    //console.log(info.provider);
});
const wallet = new ethers.Wallet(conf.privKey, provider);
var stateObj = new State();
var state = stateObj.state;

module.exports = {
    conf,
    ethers,
    provider,
    wallet,
    stateObj,
    state,
};
