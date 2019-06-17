const http = require('http');
const zlib = require('zlib');
const pathFS = require('path');
const tar = require('tar');
const fs = require('fs-extra');
const del = require('del');

const {source, jar} = require('./config');

const download = async path => {
  // Check if it's already downloaded
  const isDownloaded = await fs.pathExists(pathFS.join(path, jar));

  if (isDownloaded) {
    return;
  }

  // Create download directory if it doesn't exist
  await fs.ensureDir(path);

  return new Promise((resolve, reject) => {
    http.get(source, response => {
      if (response.statusCode !== 200) {
        return reject(new Error(`Could not retreive Step Functions Local at ${source}`));
      }

      response
        // eslint-disable-next-line new-cap
        .pipe(zlib.Unzip())
        .pipe(tar.extract({
          cwd: path
        }))
        .on('end', () => {
          return resolve();
        })
        .on('error', error => {
          return reject(new Error(`Could not retrieve Step Functions Local: ${error}`));
        });
    }).on('error', error => {
      return reject(new Error(`Could not retrieve Step Functions Local: ${error}`));
    });
  });
};

const install = path => {
  return download(path);
};

const remove = async path => {
  await del(path);
};

module.exports = {install, remove};
