const simpleGit = require('simple-git');
const log = require('./log');

module.exports = {
  init: async projectFullPath => {
    log.info('Iniciando repositório GIT localmente');
    const git = simpleGit(projectFullPath);

    await git.init();
    log.success('Repositório GIT iniciado com sucesso!');
  },
  addRemote: async (projectFullPath, remoteUrl) => {
    log.info('Adicionando a origem do repositório');
    const git = simpleGit(projectFullPath);

    await git.addRemote('origin', remoteUrl);
    log.success('Origem adicionada com sucesso!');
  },
};
