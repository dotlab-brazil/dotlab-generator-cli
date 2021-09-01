const fs = require('fs');
const path = require('path');

const currentPath = path.dirname(require.main.filename).split('/');
currentPath.pop();
exports.CURRENT_PARENT_PATH = currentPath.join('/');

exports.mkdir = dirPath => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
};

exports.join = (...str) => {
  return path.join(...str);
};

exports.copy = (src, dst) => {
  const srcContent = fs.readFileSync(src);

  fs.writeFileSync(dst, srcContent);
};
