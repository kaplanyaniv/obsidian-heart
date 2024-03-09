const fs = require('fs');
const path = require('path');

const { PRIVATE_ANNOTATION, PUBLIC_FOLDER, PRIVATE_FOLDER, copyFiles } = require('./common');

const decodePrivate = (fileContent) => {
  const privateIndex = fileContent.indexOf(PRIVATE_ANNOTATION) + PRIVATE_ANNOTATION.length;
  if (privateIndex < PRIVATE_ANNOTATION.length) {
    return fileContent;
  }
  const publicPart = fileContent.substring(0, privateIndex);
  const privatePart = fileContent.substring(privateIndex);
  const decodedPrivatePart = Buffer.from(privatePart, 'base64').toString('utf8');
  return publicPart + decodedPrivatePart;
}

copyFiles(PUBLIC_FOLDER, PRIVATE_FOLDER, decodePrivate);
console.log('Private files decoded');