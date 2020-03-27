#! /usr/bin/env node

const figlet = require('figlet'),
      chalk = require('chalk'),
      clear = require('clear'),
      rarbg = require('../RARBG/rarbg'),
      promptQuery = require('../prompt/promptQuery'),
      filter = require('../RARBG/filter'),
      promptPermission = require('../prompt/promptPermission'),
      checkConfig = require('../Config/checkConfig');
      execa = require('execa');

(async () => {

    clear();

    console.log(
        chalk.yellow(
            figlet.textSync('Get Torrents', {horizontalLayout:"full"})
        )
    );
    
    try {   

        let paths = await checkConfig();
        
        let userPref = await promptQuery();

        const searchResult = await rarbg(userPref.keyword, userPref.category);
        
        let filteredTorrent = await filter(searchResult);

        console.log('----------------------------------------------------');
        console.log(`We think the following torrent will be best: '${filteredTorrent.title}'. It has got ${filteredTorrent.seeders} seeders.`);

        let downloadAsk = await promptPermission();

        if (downloadAsk.downloadOk === 'y') {
            
            const {stdout} = await execa(`start ${paths.torrentPath} "${paths.downloadPath}" "${filteredTorrent.download}"`);
                
        }

    } catch(err) {

        console.log(err);

    }

})();

