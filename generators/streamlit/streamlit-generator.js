const fileHelper = require('../util/file-helper');
const log = require('../util/log');

const dotlabImagePath = `${__dirname}/assets/DotLab.png`;
const defaultPagesPath = [
  { name: 'about.py', path: `${__dirname}/assets/about.py.txt` },
  { name: 'page_manager.py', path: `${__dirname}/assets/page_manager.py.txt` },
];
const mainFilePath = `${__dirname}/assets/main.py.txt`;

exports.generate = projectFullPath => {
  log.info('Criando diretórios');
  fileHelper.mkdir(projectFullPath);

  const imageDirPath = fileHelper.join(projectFullPath, 'images');
  fileHelper.mkdir(imageDirPath);

  const pagesDirPath = fileHelper.join(projectFullPath, 'pages');
  fileHelper.mkdir(pagesDirPath);

  log.info('Criando arquivos');
  const imageDstDirPath = fileHelper.join(imageDirPath, 'DotLab.png');
  fileHelper.copy(dotlabImagePath, imageDstDirPath);

  for (const defaultPage of defaultPagesPath) {
    const pagesDstDirPath = fileHelper.join(pagesDirPath, defaultPage.name);
    fileHelper.copy(defaultPage.path, pagesDstDirPath);
  }

  const mainDstDirPath = fileHelper.join(projectFullPath, 'main.py');
  fileHelper.copy(mainFilePath, mainDstDirPath);

  log.success('Projeto criado com sucesso!');
};
