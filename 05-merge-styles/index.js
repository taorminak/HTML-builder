const fs = require('fs');
const path = require('path');

let dataArray = [];

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  if (err) {
    throw err;
  } 

  for (const file of files) {
    const filePath = path.join(__dirname, 'styles', file);
    fs.stat(filePath, (err, fileStats) => {
      if (err) {
        throw err;
      } else {
        if (fileStats.isFile() && path.extname(file) === '.css') {
          fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) throw err;

            const newData = data.trim();
            dataArray.push(newData);
            const finalData = dataArray.join('\n');

            fs.writeFile(
              path.join(__dirname, 'project-dist', 'bundle.css'),
              finalData,
              (err) => {
                if (err) throw err;
                 
              }
            );
          });
        }
      }
    });
  }
}
);
