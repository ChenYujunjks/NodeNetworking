import { readFile } from 'fs';

const filePath = './sample.txt'; // 确保这个文件存在

readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File content:', data);
});
