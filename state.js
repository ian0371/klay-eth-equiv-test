const fs = require('fs');

class State {
    constructor() {
        this.filename = 'state.json';
        if (fs.existsSync(this.filename)) {
            this.state = JSON.parse(fs.readFileSync(this.filename));
        }
        else {
            this.state = {
                contractAddr: 0,
            };
            this.save();
        }
    }

    add(addr) {
        this.state.contractAddr = addr;
        this.save();
    }

    save() {
        fs.writeFileSync(this.filename, JSON.stringify(this.state));
    }
}

module.exports = {
    State,
}
