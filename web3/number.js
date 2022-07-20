const { abi } = require('../compile');
const { web3, state } = require('./conf');

async function number(contract) {
    return await contract.methods.number().call();
}

async function main() {
    const contract = new web3.eth.Contract(abi, state.contractAddr);
    console.log('number:', await number(contract));
}

if (require.main === module) {
    main();
}

module.exports = number;
