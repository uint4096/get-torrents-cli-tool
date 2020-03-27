#! /usr/bin/env node

const figlet = require('figlet'),
      chalk = require('chalk'),
      clear = require('clear'),
      rarbg = require('../RARBG/rarbg'),
      filter = require('../RARBG/filter'),
      checkConfig = require('../Config/checkConfig'),
      promptConsts = require('../prompt/promptConsts'),
      promptAsk = require('../prompt/promptAsk'),
      execa = require('execa'),
      clui = require('clui'),
      Spinner = clui.Spinner;

(async () => {

    clear();

    console.log(
        chalk.yellow(
            figlet.textSync('Get Torrents', {horizontalLayout:"full"})
        )
    );
    
    const countdown = new Spinner('Getting the right torrent...');

    try {   

        const paths = await checkConfig();

        let userPref = await promptAsk(promptConsts.QUERY_QUESTIONS);
 
        countdown.start();

        const searchResult = await rarbg(userPref.keyword, userPref.category);
        
        let filteredTorrent = await filter(searchResult);

        countdown.stop();

        console.log(`\n\n -> We think the following torrent will be best: '${chalk.greenBright(filteredTorrent.title)}'. It has got ${filteredTorrent.seeders} seeders.\n`);

        let downloadAsk = await promptAsk(promptConsts.PERMISSION_QUESTION);

        if (downloadAsk.downloadOk === 'y') {
            
            const {stdout} = await execa(`start ${paths.torrentPath} "${paths.downloadPath}" "${filteredTorrent.download}"`);
                
        }

    } catch(err) {

        console.log('\n\n -> '+ chalk.redBright(err.error));
        countdown.stop();

    }

})();

