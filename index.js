const inquirer = require('inquirer');
const chalk = require('chalk');
const emoji = require('node-emoji');
const streamlitGenerator = require('./generators/streamlit/streamlit-generator');
const fileHelper = require('./generators/util/file-helper');
const gitHelper = require('./generators/util/git-helper');

const ANSWER_KEYS = {
  projectTypeKey: 'projectType',
  projectNameKey: 'projectName',
  projectPathKey: 'projectPath',
  projectPathConfirmKey: 'projectPathConfirm',
  gitInitConfirmKey: 'gitInitConfirm',
  gitAddRemoteConfirmKey: 'gitAddRemoteAndPushConfirm',
  gitRemoteURLKey: 'gitRemoteURL',
};

const EXIT_KEY = 'Sair';

function printHeader() {
  console.log(
    chalk.bold.white('#####   ') +
      emoji.get('computer') +
      chalk.bold.red('  DotLAB ') +
      chalk.bold.white('Project Generator CLI  ') +
      emoji.get('computer') +
      chalk.bold.white('   #####\n')
  );
}

function printExitMessage() {
  console.log(chalk.bold.white('\n#####   Até a próxima  ') + emoji.get('wave') + chalk.bold.white('   #####'));
}

function askProjectType() {
  const question = {
    type: 'list',
    message: 'Qual o tipo de projeto você deseja criar?',
    name: ANSWER_KEYS.projectTypeKey,
    choices: ['streamlit.io', new inquirer.Separator(), EXIT_KEY],
  };

  return inquirer.prompt(question);
}

function askProjectName() {
  const question = {
    type: 'input',
    message: 'Qual o nome do projeto?',
    name: ANSWER_KEYS.projectNameKey,
    validate(value) {
      const pass = value.match(/^[^\\/?%*:|"<>\.]+$/i);

      if (pass) return true;

      return 'Por favor, informe um nome válido';
    },
  };

  return inquirer.prompt(question);
}

function askProjectPath() {
  const question = {
    type: 'input',
    message: `Onde o projeto deve ser criado?`,
    name: ANSWER_KEYS.projectPathKey,
    default: fileHelper.CURRENT_PARENT_PATH,
  };

  return inquirer.prompt(question);
}

function askConfirmProjectPath(projectFullPath) {
  const question = {
    type: 'confirm',
    message: `Você confirma o caminho onde o projeto será criado? [${projectFullPath}]`,
    name: ANSWER_KEYS.projectPathConfirmKey,
    default: true,
  };

  return inquirer.prompt(question);
}

function askConfirmGitInit(projectFullPath) {
  const question = {
    type: 'confirm',
    message: `Inicializar repositório GIT (git init)? [${projectFullPath}]`,
    name: ANSWER_KEYS.gitInitConfirmKey,
    default: false,
  };

  return inquirer.prompt(question);
}

function askConfirmGitAddRemote(projectFullPath) {
  const question = {
    type: 'confirm',
    message: `Gostaria de adicionar a origem do repositório GIT (git add remote)? [${projectFullPath}]`,
    name: ANSWER_KEYS.gitAddRemoteConfirmKey,
    default: false,
  };

  return inquirer.prompt(question);
}

function askGitRemoteURL() {
  const question = {
    type: 'input',
    message: 'Qual a URL do repositório GIT?',
    name: ANSWER_KEYS.gitRemoteURLKey,
    validate(value) {
      const pass = value.match(/((git|ssh|http(s)?)|(git@[\w\.]+))(:(\/\/)?)([\w\.@\:/\-~]+)(\.git)(\/)?/g);

      if (pass) return true;

      return 'Por favor, uma URL válida';
    },
  };
  return inquirer.prompt(question);
}

(async () => {
  printHeader();

  const projectType = (await askProjectType())[ANSWER_KEYS.projectTypeKey];

  if (projectType === EXIT_KEY) return 0;

  const projectName = (await askProjectName())[ANSWER_KEYS.projectNameKey];
  const projectPath = (await askProjectPath())[ANSWER_KEYS.projectPathKey];

  const projectFullPath = fileHelper.join(projectPath, projectName);
  const confirmProjectPath = (await askConfirmProjectPath(projectFullPath))[ANSWER_KEYS.projectPathConfirmKey];

  if (!confirmProjectPath) return 0;

  if (projectType === 'streamlit.io') {
    streamlitGenerator.generate(projectFullPath);
  }

  const confirmGitInit = (await askConfirmGitInit(projectFullPath))[ANSWER_KEYS.gitInitConfirmKey];

  if (confirmGitInit) {
    await gitHelper.init(projectFullPath);
  }

  const confirmGitAddRemote = (await askConfirmGitAddRemote(projectFullPath))[ANSWER_KEYS.gitAddRemoteConfirmKey];

  if (confirmGitAddRemote) {
    const gitRemoteURL = (await askGitRemoteURL())[ANSWER_KEYS.gitRemoteURLKey];
    await gitHelper.addRemote(projectFullPath, gitRemoteURL);
  }

  printExitMessage();
})();
