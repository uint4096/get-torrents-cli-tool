const inquirer = require('inquirer');

const PATH_QUESTIONS = [
    {
        name: 'torrentPath',
        type: 'text',
        message: 'Enter the complete path (including filename) to your uTorrent file: ',
        validate: function(value){
            if (new RegExp(/^(?:[a-zA-Z]\:|\\\\[\w\.]+\\[\w.$]+)\\(?:[\w]+\\)*\w([\w.])+$/).test(value)) {
                return true;
            } else {
                console.log("\nPlease enter a valid value:")
                return false;
            }
        }
    },
    {
        name: 'downloadPath',
        type: 'text',
        message: 'Enter the path where you want to download the file: ',
        validate: function(value){
            if (new RegExp(/^(?:[a-zA-Z]\:|\\\\[\w\.]+\\[\w.$]+)\\(?:[\w]+\\)*\w([\w.])+$/).test(value)) {
                return true;
            } else {
                console.log("\nPlease enter a valid value:")
                return false;
            }
        }
    }
]

module.exports = function(){

    return inquirer.prompt(PATH_QUESTIONS);

}