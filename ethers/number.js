const { abi, bytecode } = require('../compile');
const { ethers, wallet, state } = require('./conf');

async function number(contract) {
    const ret = await contract.number();
    return ret.toNumber();
}

async function main() {
    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    const contract = factory.attach(state.contractAddr);
    console.log('number:', await number(contract));
}

if (require.main === module) {
    main();
}

module.exports = number;
