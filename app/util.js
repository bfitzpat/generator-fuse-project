const chalk = require('chalk');

const utils = {};

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