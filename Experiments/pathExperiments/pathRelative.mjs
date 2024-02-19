import path from 'path';
// 定义两个路径

// fromPath 是起始路径
const fromPath = '/data/user/projects';
// toPath 是目标路径
const toPath = '/data/user/projects/nodejs/pathRelative.mjs';

//使用 path.relative(from, to) 计算两个路径之间的相对路径
const relativePath = path.relative(fromPath, toPath);

// 打印结果
console.log(`Relative path from '${fromPath}' to '${toPath}' is: \n'${relativePath}'`);
console.log('这表示，要从起始路径到达目标路径，可以遵循这个相对路径。');
