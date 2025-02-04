const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, 'styles');
const componentsFolder = path.join(__dirname, 'components');
const srcPath = path.join(__dirname, 'assets');
const distPath = path.join(__dirname, 'project-dist');


(async () => {
  await fs.promises.mkdir(distPath, { recursive: true });
  await fs.promises.writeFile(
    path.join(__dirname, 'project-dist/style.css'),
    ''
  );
  const assets = await fs.promises.readdir(srcPath);
  const assetsFolder = path.join(distPath, 'assets');
  await fs.promises.mkdir(assetsFolder, { recursive: true });
  for (const asset of assets) {
    const srcFilePath = path.join(srcPath, asset);
    const distFilePath = path.join(distPath, 'assets', asset);
    const stats = await fs.promises.stat(srcFilePath);
    if (stats.isDirectory()) {
      await fs.promises.mkdir(distFilePath, { recursive: true });
      const files = await fs.promises.readdir(srcFilePath);
      for (const file of files) {
        const srcFile = `${srcFilePath}/${file}`;
        const distFile = `${distFilePath}/${file}`;  
        await fs.promises.copyFile(srcFile, distFile);}
    
    } else {
      await fs.promises.copyFile(srcFilePath, distFilePath);

    }}

  const files = await fs.promises.readdir(stylesPath);
  for (const file of files) {
    const data = await fs.promises.readFile(
      path.join(stylesPath, file),
      'utf8'
    );
    await fs.promises.appendFile(
      '06-build-page/project-dist/style.css',
      data
    );
  }
  console.log('File was successfully appended!');
} 
  
)();
  

async function readFileAsync() {
  try {
    let data = await fs.promises.readFile(
      path.join(__dirname, 'template.html'),
      'utf-8'
    );
    const templateTags = data.match(/{{\s*(\w+)\s*}}/g);
    if (templateTags) {
      for (const tag of templateTags) {
        const tagName = tag.match(/{{\s*(\w+)\s*}}/)[1];
        const componentFilePath = path.join(
          componentsFolder,
          `${tagName}.html`
        );
        const componentContent = await fs.promises.readFile(
          componentFilePath,
          'utf8'
        );
        data = data.replace(tag, componentContent);
        await fs.promises.writeFile(
          path.join(__dirname, 'project-dist/index.html'),
          data
        );
      }
    }
  } catch (err) {
    console.error(err);
  }
}

readFileAsync();
