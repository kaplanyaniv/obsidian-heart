// Get all files in public folder and encode the private part to base64 
// and save them in private folder

const { PRIVATE_ANNOTATION, PUBLIC_FOLDER, PRIVATE_FOLDER, copyFiles, stringIsEmpty, encodeString } = require('./common');

const encodePrivate = (fileName, fileContent) => {
  const privateIndex = fileContent.indexOf(PRIVATE_ANNOTATION);
  if (privateIndex === -1) {
    return {content: fileContent, name: fileName};
  }
  const publicPart = fileContent.substring(0, privateIndex);
  const privatePart = fileContent.substring(privateIndex + PRIVATE_ANNOTATION.length);
  const encodedPrivatePart = encodeString(privatePart);
  const name = stringIsEmpty(publicPart) ? encodeString(fileName) : fileName;
  return {content: publicPart + PRIVATE_ANNOTATION + encodedPrivatePart, name};
}

copyFiles(PRIVATE_FOLDER, PUBLIC_FOLDER, encodePrivate);
console.log('Private files encoded');