#! /usr/bin/env node

const figlet = require('figlet'),
      chalk = require('chalk'),
      clear = require('clear'),
      rarbg = require('../RARBG/rarbg'),
      promptQuery = require('../prompt/promptQuery'),
      filter = require('../RARBG/filter'),
      promptPermission = require('../prompt/promptPermission'),
      promptPath = require('../prompt/promptPath'),
      execa = require('execa');

(async () => {

    clear();

    console.log(
        chalk.yellow(
            figlet.textSync('Get Torrents', {horizontalLayout:"full"})
        )
    );

    let userPref = await promptQuery();
    
    try {

        const searchResult = await rarbg(userPref.keyword, userPref.category);
        //console.log(searchResult);
        let filteredTorrent = await filter(searchResult);

        console.log('----------------------------------------------------');
        console.log(`We think the following torrent will be best: '${filteredTorrent.title}'. It has got ${filteredTorrent.seeders} seeders.`);

        let downloadOk = await promptPermission();

        if (downloadOk.downloadOk === 'y') {

            let paths = await promptPath();
            
            const {stdout} = await execa(`start ${paths.torrentPath} "${paths.downloadPath}" "${filteredTorrent.download}"`);
                
        }

    } catch(err) {

        console.log(err);

    }

})();

