import path from 'path';
// 定义一个文件路径
const filePath = '/data/user/projects/nodejs/pathExample.mjs';

// 使用 path.parse() 解析文件路径的各个部分
const parsedPath = path.parse(filePath);
console.log('Parsed Path:', parsedPath);
console.log('解析后的路径包括：目录、文件名、扩展名等信息。');

// 修改文件名和扩展名
// 注意：当修改 base 属性时，原有的 name 和 ext 属性的值将被忽略
const newPathObj = {
  ...parsedPath,
  base: 'newExample.txt', // 直接修改 base 属性以更改文件名和扩展名
};

// 使用 path.format() 根据修改后的路径对象重新构造路径字符串
const formattedPath = path.format(newPathObj);
console.log('Formatted Path:', formattedPath);
console.log('根据修改后的路径对象重新构造的路径字符串。');