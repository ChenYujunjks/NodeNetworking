import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import test from 'node:test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__filename);
console.log(__dirname);


console.log(path.join('/experiments', 'test', 'demo.txt'));

// 绝对路径
console.log(path.resolve('pathBasics.mjs'));