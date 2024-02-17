// ES6 Modules
import path from 'path';

// 定义两个路径
const fromPath = '/data/user/projects';
const toPath = '/data/user/projects/nodejs/pathRelative.mjs';

// 获取从 fromPath 到 toPath 的相对路径
const relativePath = path.relative(fromPath, toPath);

console.log(`Relative path from '${fromPath}' to '${toPath}' is: '${relativePath}'`);
