import path from 'path';
// 定义一个文件路径
const filePath = '/data/user/projects/nodejs/pathExample.mjs';

// 使用 path.parse() 解析文件路径的各个部分
const parsedPath = path.parse(filePath);
console.log('Parsed Path:解析后的路径包括：目录、文件名、扩展名等信息。--->\n', parsedPath);

// 修改文件名和扩展名
// **注意** ：当修改 base 属性时，原有的 name 和 ext 属性的值将被忽略
const newPathObj = {
  ...parsedPath, //你实际上是在复制 parsedPath 对象中的所有属性到 newPathObj 新对象中。
  base: 'newExample.txt', //!! 直接修改 base 属性以更改文件名和扩展名
};
//因为在使用 path.format() 时，如果 base 属性存在，它会优先使用，而不是 name 和 ext
 
const formattedPath = path.format(newPathObj);
console.log('original path:', filePath)
console.log('Formatted Path:', formattedPath);
//根据修改后的路径对象重新构造的路径字符串