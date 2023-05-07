const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const writeStream = fs.createWriteStream('./02-write-file/text.txt', {flags: 'a'});

console.log('Добрый день! Введите ваш текст:');

rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    console.log('До свидания!');
    rl.close();
    writeStream.end();
    process.exit();
  } else {
    writeStream.write(input+'\n', (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
});

rl.on('SIGINT', () => {
  console.log('До свидания!');
  rl.close();
  writeStream.end();
  process.exit();
});
  