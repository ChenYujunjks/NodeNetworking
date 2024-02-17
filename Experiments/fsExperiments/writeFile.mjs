import { writeFile } from 'fs';

const content = 'Hello, this is some text!';
const filePath = './output.txt';

writeFile(filePath, content, err => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }
  console.log('File written successfully');
});
