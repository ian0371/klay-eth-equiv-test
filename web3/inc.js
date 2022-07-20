const { abi } = require('../compile');
const { conf, web3, acc, state } = require('./conf');
const number = require('./number');

async function increment(contract) {
    const val = 20;
    const data = contract.methods.increment(val).encodeABI();
    const tx = await web3.eth.accounts.signTransaction(
        {
            from: acc.address,
            to: state.contractAddr,
            data: data,
            gas: '20000000', // rinkeby also requires gas
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

    console.log('number before increment:', await number(contract));

    const incrementHash = await increment(contract);
    console.log('tx hash:', incrementHash);

    let transactionReceipt = null
    while (true) { // Waiting expectedBlockTime until the transaction is mined
        transactionReceipt = await web3.eth.getTransactionReceipt(incrementHash);
        if (transactionReceipt != null) {
            break;
        }
        console.log('Sleeping...');
        await sleep(1000);
    }

    console.log('number after increment:', await number(contract));
}

if (require.main === module) {
    main();
}

module.exports = increment;
