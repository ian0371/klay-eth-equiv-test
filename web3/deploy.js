const { abi, bytecode } = require('../compile');
const { conf, web3, acc, stateObj } = require('./conf');

async function deploy() {
    const contract = new web3.eth.Contract(abi);

    const data = contract.deploy({
        data: bytecode,
        arguments: [10],
    }).encodeABI();
    const tx = await web3.eth.accounts.signTransaction(
        {
            from: acc.address,
            data: data,
            gas: '20000000',
        },
        conf.privKey
    );
    const rc = await web3.eth.sendSignedTransaction(
        tx.rawTransaction
    );
    return rc.contractAddress;
}

async function main() {
    console.log('Deployer:', acc.address);
    const contractAddr = await deploy();
    console.log('Contract deployed at address', contractAddr);

    stateObj.add(contractAddr);
    console.log('the address is stored in state.json');
}

if (require.main === module) {
    main();
}

module.exports = deploy;
