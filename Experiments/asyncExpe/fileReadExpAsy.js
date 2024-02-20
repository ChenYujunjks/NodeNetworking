const fs = require('fs');

// 异步读取文件
fs.readFile('example.txt', 'utf8', function(err, data) {
  if (err) {
    console.error('读取文件时出错：', err);
    return;
  }
  console.log('文件内容为：', data);
});

console.log('继续执行后续代码...');
console.log('没有了啊阿啊阿啊阿啊')