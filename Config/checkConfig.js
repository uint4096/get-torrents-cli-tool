const configStore = require('configstore'),
      pacakageJson = require('../package.json'),
      promptPath = require('../prompt/promptPath'),
      chalk = require('chalk');


module.exports = async function(){

    const config = new configStore(pacakageJson);
    
    if (config.has('torrentPath') && config.has('downloadPath')) {

        let torrentPathConfig = config.get('torrentPath');
        let downloadPathConfig = config.get('downloadPath');
        return Promise.resolve({
            torrentPath: torrentPathConfig, 
            downloadPath: downloadPathConfig
        });

    } else {

        console.log(chalk.green('Welcome to GetTorrents!\n'));
        let paths = await promptPath();
        config.set('torrentPath', paths.torrentPath);
        config.set('downloadPath', paths.downloadPath);
        console.log(chalk.green('\nYou are ready to go!\n'))
        return Promise.resolve(paths);
    }
}