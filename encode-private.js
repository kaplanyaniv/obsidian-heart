// Get all files in public folder and encode the private part to base64 
// and save them in private folder

const fs = require('fs');
const path = require('path');

const { PRIVATE_ANNOTATION, PUBLIC_FOLDER, PRIVATE_FOLDER, copyFiles } = require('./common');

const encodePrivate = (fileContent) => {
  const privateIndex = fileContent.indexOf(PRIVATE_ANNOTATION) + PRIVATE_ANNOTATION.length;
  if (privateIndex < PRIVATE_ANNOTATION.length) {
    return fileContent;
  }
  const publicPart = fileContent.substring(0, privateIndex);
  const privatePart = fileContent.substring(privateIndex);
  const encodedPrivatePart = Buffer.from(privatePart).toString('base64');
  return publicPart + encodedPrivatePart;
}

copyFiles(PRIVATE_FOLDER, PUBLIC_FOLDER, encodePrivate);
console.log('Private files encoded');