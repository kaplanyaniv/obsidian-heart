
const { PRIVATE_ANNOTATION, PUBLIC_FOLDER, PRIVATE_FOLDER, copyFiles, stringIsEmpty, decodeString } = require('./common');

const decodePrivate = (fileName, fileContent) => {
  const privateIndex = fileContent.indexOf(PRIVATE_ANNOTATION);
  if (privateIndex === -1) {
    return {content: fileContent, name: fileName};
  }
  const publicPart = fileContent.substring(0, privateIndex);
  const privatePart = fileContent.substring(privateIndex + PRIVATE_ANNOTATION.length);
  const decodedPrivatePart = decodeString(privatePart);
  const name = stringIsEmpty(publicPart) ? decodeString(fileName) : fileName;
  return {content: publicPart + PRIVATE_ANNOTATION + decodedPrivatePart, name };
}

copyFiles(PUBLIC_FOLDER, PRIVATE_FOLDER, decodePrivate);
console.log('Private files decoded');