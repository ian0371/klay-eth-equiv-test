const { abi, bytecode } = require('../compile');
const { ethers, wallet, stateObj } = require('./conf');

async function deploy() {
    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    const contract = await factory.deploy(10);
    await contract.deployed();
    return contract.address;
}

async function main() {
    console.log('Deployer:', wallet.address);
    const contractAddr = await deploy();
    console.log('Contract deployed at address', contractAddr);

    stateObj.add(contractAddr);
    console.log('the address is stored in state.json');
}

if (require.main === module) {
    main();
}

module.exports = deploy;
