const fs = require('fs/promises');
const path = require('path');

const secretFolderPath = path.join(__dirname, 'secret-folder');

fs.readdir(secretFolderPath, {withFileTypes: true})
  .then(files => {
    files.forEach(file => {
      if (file.isFile()) {
        fs.stat(path.join(secretFolderPath, file.name))
          .then(fileStat => {
            const filename = path.parse(file.name).name;
            const ext = path.parse(file.name).ext.slice(1);
            const fileSize = Math.round(fileStat.size / 1024);
            console.log(`${filename} - ${ext} - ${fileSize}kb`);
          })
          .catch(err => console.error(err));
      }
    });
  })
  .catch(err => console.error(err));