const { abi } = require('../compile');
const { web3, acc, state } = require('./conf');
const number = require('./number');

async function increment(contract) {
    const val = 20;
    const tx = await contract.methods.increment(val).send(
        {
            from: acc.address,
        }
    );
    return tx;
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function main() {
    console.log("WARNING: THIS DOES NOT WORK AS IT REQUIRES PRIVATE KEY IN THE NODE");
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
