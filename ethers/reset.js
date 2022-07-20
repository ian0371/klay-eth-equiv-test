const { abi, bytecode } = require('../compile');
const { ethers, wallet, state } = require('./conf');
const number = require('./number');

async function reset(contract) {
    const tx = await contract.reset();
    await tx.wait();
    return tx.hash;
}

async function main() {
    console.log('tx sender:', wallet.address);
    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    const contract = factory.attach(state.contractAddr);

    console.log('number before reset:', await number(contract));

    const resetHash = await reset(contract);
    console.log('tx hash:', resetHash);

    console.log('number after reset:', await number(contract));
}

if (require.main === module) {
    main();
}

module.exports = reset;
