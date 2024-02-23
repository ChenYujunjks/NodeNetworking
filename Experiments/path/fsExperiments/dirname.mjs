import { writeFile } from 'fs';
import { join } from 'path';

const content = 'Hello, this is some text \n from the new dirname using direct directory!';
const filePath = join(__dirname, 'output.txt'); // 使用 __dirname 构造绝对路径

writeFile(filePath, content, err => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }
  console.log('File written successfully');
});
