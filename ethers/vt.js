const { provider, wallet } = require('./conf');

const to = '0x000000000000000000000000000000000000dead';

async function balance(addr) {
    const bal = await provider.getBalance(addr);
    return bal.toNumber();
}

async function vt() {
    let tx = {
        to: to,
        value: '100000',
    }
    // Send a transaction
    return await wallet.sendTransaction(tx);
}

async function main() {
    console.log('tx sender:', wallet.address);

    console.log('balance before vt:', await balance(to));

    const tx = await vt();
    console.log('tx hash:', tx.hash);
    await provider.waitForTransaction(tx.hash);

    console.log('balance after vt:', await balance(to));
}

if (require.main === module) {
    main();
}

module.exports = vt;
