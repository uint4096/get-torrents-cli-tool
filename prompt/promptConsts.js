const inquirer = require('inquirer'),
      chalk = require('chalk');

// Questions about uTorrent paths
exports.PATH_QUESTIONS = [
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

// Questions to get the query string and the category
exports.QUERY_QUESTIONS = [
    {
        name: 'keyword',
        type: 'text',
        message: 'What are you looking for?',
        validate: function(value){
            if (value.length && value.length < 35) {
                return true;
            } else {
                console.log("\nPlease enter a valid value.")
                return false;
            }
        }
    },

    {
        name: 'category',
        type: 'list',
        message: 'select a category?',
        choices: ['Movies', 'TV', 'Games']
    }
]

// Question to ask permission before downloading torrents
exports.PERMISSION_QUESTION = [
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
