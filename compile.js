const path = require('path');
const fs = require("fs");
const solc = require('solc');

function findImports(p) {
    const pathPrefix = __dirname + '/node_modules/'
    const content = fs.readFileSync(pathPrefix + p).toString();
    return {
        contents: content
    };
}

// Compile contract
const contractName = 'inc';
const fileName = contractName + '.sol';
const contractPath = path.resolve(__dirname, `./contracts/${fileName}`);
const source = fs.readFileSync(contractPath, 'utf8');
const input = {
    language: 'Solidity',
    sources: {
        [fileName]: {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};
const tempFile = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));
const contractFile = tempFile.contracts[fileName][contractName]
module.exports = {
    abi: contractFile.abi,
    bytecode: contractFile.evm.bytecode.object
};
