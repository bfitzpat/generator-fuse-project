const chalk = require('chalk');

const utils = {};

// would be good to handle a few other validation tasks here as well, 
// such as validating the Camel version (is 2.18.1 valid vs. 4.0.0 invalid)

utils.validateCamelDSL = function (value) {
    const isBlueprint = value.match('blueprint');
    const isSpring = value.match('spring');
    let returnValue;
    if (!isBlueprint && !isSpring) {
        returnValue = chalk.red('Camel DSL must be either \'spring\' or \'blueprint\'');
    } else {
        returnValue = true;
    }
    return returnValue;
}

module.exports = utils;