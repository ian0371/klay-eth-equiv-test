const { conf, web3, acc } = require('./conf');

const to = '0x000000000000000000000000000000000000dead';

async function balance(addr) {
    return await web3.eth.getBalance(addr);
}

async function vt() {
    const tx = await web3.eth.accounts.signTransaction(
        {
            from: acc.address,
            to: to,
            gas: '20000000',
            value: '100000',
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
    console.log('tx receiver:', );

    console.log('balance before vt:', await balance(to));

    const vtHash = await vt();
    console.log('tx hash:', vtHash);

    let transactionReceipt = null
    while (true) { // Waiting expectedBlockTime until the transaction is mined
        transactionReceipt = await web3.eth.getTransactionReceipt(vtHash);
        if (transactionReceipt != null) {
            break;
        }
        console.log('Sleeping...');
        await sleep(1000);
    }

    console.log('balance after vt:', await balance(to));
}

if (require.main === module) {
    main();
}

module.exports = vt;
