
//Filter by seeders
module.exports = function(searchResult){

    let maxSeeders = 0;
    let objMaxSeeder = {};
    searchResult.map((torrenttObj) => {
        if (torrenttObj.seeders > maxSeeders) {
            maxSeeders = torrenttObj.seeders
            objMaxSeeder = torrenttObj;
        }
    });

    return Promise.resolve(objMaxSeeder);
}