const fs = require('fs/promises');
const path = require('path');

(async () => {
  try {
  
    await fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true });
  
    const files = await fs.readdir(path.join(__dirname,'files'));
  
    for (const file of files) {
      await fs.copyFile(
        path.join(__dirname, 'files', file),
        path.join(__dirname, 'files-copy', file)
      );
      console.log(`${file} был скопирован`);
    }
  
  } catch (error) {
    console.log(error);
  }
})();



  
  