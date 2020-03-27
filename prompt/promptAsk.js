const inquirer = require('inquirer');

module.exports = function(questionArr){

    return inquirer.prompt(questionArr);

}