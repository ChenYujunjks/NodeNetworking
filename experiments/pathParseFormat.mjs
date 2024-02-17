// ES6 Modules
import path from 'path';

// 定义一个路径
const filePath = '/data/user/projects/nodejs/pathExample.mjs';

// 使用 path.parse() 解析路径
const parsedPath = path.parse(filePath);
console.log('Parsed Path:', parsedPath);

// 修改文件名和扩展名
const newPathObj = {
  ...parsedPath,
  base: 'newExample.txt', // 修改 base 时，name 和 ext 会被忽略
};

// 使用 path.format() 重新构造路径
const formattedPath = path.format(newPathObj);
console.log('Formatted Path:', formattedPath);
