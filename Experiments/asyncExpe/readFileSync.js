const fs = require('fs');

try {
  const data = fs.readFileSync('example.txt', 'utf8');
  console.log('文件内容为：', data);
} catch (err) {
  console.error('读取文件时出错：', err);
}

console.log('继续执行后续代码...');
