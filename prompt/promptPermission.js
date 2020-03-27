const inquirer = require('inquirer'),
      chalk = require('chalk');

const PERMISSION_QUESTION = [
    {
        name: 'downloadOk',
        type: 'text',
        message: chalk.yellow('Do you want to download (y/n)?'),
        validate: function(value){
            if (value.toLowerCase() === 'y' || value.toLowerCase() === 'n' ){
                return true;
            } else {
                console.log("\nPlease enter a valid value.");
                return false;
            }
        }
    }
]

module.exports = function(){

    return inquirer.prompt(PERMISSION_QUESTION);

}