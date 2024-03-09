const path = require('path');
const fs = require('fs');

const PRIVATE_ANNOTATION = '__private__';
const PUBLIC_FOLDER = path.join(__dirname, 'public');
const PRIVATE_FOLDER = path.join(__dirname, 'private');

const copyFiles = (copyFrom, copyTo, actOnContent) => {
  const files = fs.readdirSync(copyFrom);
  files.forEach(file => {
    const filePath = path.join(copyFrom, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      const newDirPath = path.join(copyTo, file);
      if (!fs.existsSync(newDirPath)) {
        fs.mkdirSync(newDirPath);
      }
      copyFiles(filePath, newDirPath, actOnContent);
    } else {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const newFilePath = path.join(copyTo, file);
      const newFileContent = actOnContent(fileContent);
      fs.writeFileSync(newFilePath, newFileContent);
    }
  });
}

module.exports = {
  PRIVATE_ANNOTATION,
  PUBLIC_FOLDER,
  PRIVATE_FOLDER,
  copyFiles
};
