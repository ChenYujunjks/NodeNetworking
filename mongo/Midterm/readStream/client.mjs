// ES6模块导入
import fs from 'fs';
import net from 'net';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const client = net.createConnection({ port: 8080 }, () => {
  console.log('Connected to server!');
  const filePath = path.join(__dirname, 'example.md'); // 使用当前工作目录
  const readStream = fs.createReadStream(filePath);

  readStream.pipe(client);

  readStream.on('end', () => {
    console.log('File has been sent');
    client.end();
  });
});

client.on('end', () => {
  console.log('Disconnected from server');
});
