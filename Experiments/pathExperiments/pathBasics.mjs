import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import test from 'node:test';

// 转换当前模块的URL为文件路径
const __filename = fileURLToPath(import.meta.url);
// 获取当前文件所在目录的路径
const __dirname = dirname(__filename);

// 打印当前文件的完整路径
console.log('当前文件的完整路径:', __filename);
// 打印当前文件所在的目录路径
console.log('当前文件所在的目录路径:', __dirname);

// 使用path.join连接路径片段
console.log('使用path.join连接的路径:', path.join('/experiments', 'test', 'demo.txt'));

// 使用path.resolve解析为绝对路径
// 注意：这里解析的路径依赖于运行node命令时的当前工作目录
console.log('使用path.resolve解析的绝对路径:', path.resolve('pathBasics.mjs'));
