const rarbgApi = require('rarbg-api');

module.exports = async (query, category) => {

    let options = await createOptions(category);

    return rarbgApi.search(query, options);

}

let createOptions = function(category) {

    let optionsObject = {
        category: null,
        limit: 35,
        sort: 'seeders',
        format: 'json_extended',
    }

    switch(category){
        case 'Movies': 
            optionsObject.category = rarbgApi.CATEGORY.MOVIES
            break;
        
        case 'TV':
            optionsObject.category = rarbgApi.CATEGORY.TV
            break;

        case 'Games':
            optionsObject.category = rarbgApi.CATEGORY.GAMES_PC_ISO
            break;
        
        default:
            optionsObject.category = rarbgApi.CATEGORY.MOVIES
    }

    return new Promise((resolve, reject) => {

        if (category.length) {
            resolve(optionsObject)
        } else {
            reject("Please select a valid category");
        }
    })

}

