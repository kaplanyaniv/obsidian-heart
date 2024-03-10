const path = require('path');
const fs = require('fs');

const PRIVATE_ANNOTATION = '__private__\n';
const PUBLIC_FOLDER = path.join(__dirname, '../public');
const PRIVATE_FOLDER = path.join(__dirname, '../private');

const copyFiles = (copyFrom, copyTo, actOnFile) => {
  const files = fs.readdirSync(copyFrom);
  files.forEach(file => {

    if (file.startsWith('.')) {
      return;
    }

    const filePath = path.join(copyFrom, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      const newDirPath = path.join(copyTo, file);
      if (!fs.existsSync(newDirPath)) {
        fs.mkdirSync(newDirPath);
      }
      copyFiles(filePath, newDirPath, actOnFile);
    } else {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const {name: newName, content: newContent} = actOnFile(file, fileContent);
      const newFilePath = path.join(copyTo, newName);

      fs.writeFileSync(newFilePath, newContent);
    }
  });
}

const stringIsEmpty = (str) => {
  return !str || str.trim().length === 0;
}

const decodeString = (str) => {
  return Buffer.from(str, 'base64').toString('utf8');
}

const encodeString = (str) => {
  return Buffer.from(str).toString('base64');
}

module.exports = {
  PRIVATE_ANNOTATION,
  PUBLIC_FOLDER,
  PRIVATE_FOLDER,
  copyFiles,
  stringIsEmpty,
  decodeString,
  encodeString
};
