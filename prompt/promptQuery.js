const inquirer = require('inquirer');

const QUERY_QUESTIONS = [
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

module.exports = () => {
    
    return inquirer.prompt(QUERY_QUESTIONS);
    
}