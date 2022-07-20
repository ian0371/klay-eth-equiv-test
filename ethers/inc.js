const { abi, bytecode } = require('../compile');
const { ethers, wallet, state } = require('./conf');
const number = require('./number');

async function increment(contract) {
    const val = 20;
    const tx = await contract.increment(val);
    await tx.wait();
    return tx.hash;
}

async function main() {
    console.log('tx sender:', wallet.address);
    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    const contract = factory.attach(state.contractAddr);

    console.log('number before increment:', await number(contract));

    const incrementHash = await increment(contract);
    console.log('tx hash:', incrementHash);

    console.log('number after increment:', await number(contract));
}

if (require.main === module) {
    main();
}

module.exports = increment;
