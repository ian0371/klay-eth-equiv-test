const { abi } = require('../compile');
const { conf, web3, acc, state } = require('./conf');
const number = require('./number');

async function reset(contract) {
    const val = 20;
    const data = contract.methods.reset().encodeABI();
    const tx = await web3.eth.accounts.signTransaction(
        {
            from: acc.address,
            to: state.contractAddr,
            data: data,
            gas: '20000000',
        },
        conf.privKey
    );
    const rc = await web3.eth.sendSignedTransaction(
        tx.rawTransaction
    );
    return rc.transactionHash;
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function main() {
    console.log('tx sender:', acc.address);
    const contract = new web3.eth.Contract(abi, state.contractAddr);

    console.log('number before reset:', await number(contract));

    const resetHash = await reset(contract);
    console.log('tx hash:', resetHash);

    let transactionReceipt = null
    while (true) { // Waiting expectedBlockTime until the transaction is mined
        transactionReceipt = await web3.eth.getTransactionReceipt(resetHash);
        if (transactionReceipt != null) {
            break;
        }
        console.log('Sleeping...');
        await sleep(1000);
    }

    console.log('number after reset:', await number(contract));
}

if (require.main === module) {
    main();
}

module.exports = reset;
