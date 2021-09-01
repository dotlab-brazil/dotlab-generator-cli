const chalk = require('chalk');
const emoji = require('node-emoji');

module.exports = {
  info: msg => console.log(chalk.bold.blue('>  ') + chalk.bold.white(msg)),
  success: msg => console.log(chalk.bold.blue('>  ') + chalk.bold.green(msg) + ' ' + emoji.get('tada')),
};
