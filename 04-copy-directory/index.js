const fs = require('fs/promises');
const path = require('path');

(async () => {
  try {
    const filesCopyDir = path.join(__dirname, 'files-copy');

    await fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true });
  
    const files = await fs.readdir(path.join(__dirname,'files'));
    const filesCopy = await fs.readdir(filesCopyDir);

    for (const fileCopy of filesCopy) {
      if (!files.includes(fileCopy)) {
        await fs.unlink(path.join(filesCopyDir, fileCopy));
      }
    }

    for (const file of files) {
      await fs.copyFile(
        path.join(__dirname, 'files', file),
        path.join(filesCopyDir, file)
      );
      console.log(`${file} был скопирован`);
    }
  
  } catch (error) {
    console.log(error);
  }
})();



  
  