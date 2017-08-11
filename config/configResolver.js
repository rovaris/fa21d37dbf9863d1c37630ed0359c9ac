const fs = require('fs');
const os = require("os");
const path = require('path'); 

function loadConfig(env) {
    const hostname = os.hostname();
    const defaultConfigFile = path.join(__dirname, './default.vars.json');
    const customConfigFile = path.join(__dirname, `./hosts/${hostname}.vars.json`);
    let config = null; 

    try {
        config = JSON.parse(fs.readFileSync(customConfigFile, 'utf8'));
    } catch(e) {
        console.error(
            `Error loading machine config file: ${customConfigFile},\n
            followed by error: \n${e}`
        );
        config = JSON.parse(fs.readFileSync(defaultConfigFile, 'utf8'));
    }

    if (!config) {
        return new Error("no config file specified");
    }

    return config[env];
};

module.exports = {
    loadConfig,
};
