import net from 'net';
import fs from 'fs';
import path, { dirname} from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const server = net.createServer((conn) => {
  console.log('Client connected');

  const outputPath = path.join(__dirname, 'output.md'); // 使用当前工作目录
  const writeStream = fs.createWriteStream(outputPath);

  conn.pipe(writeStream);

  conn.on('end', () => {
    console.log('File has been received');
  });

  conn.on('error', (err) => {
    console.error('Connection error:', err);
  });
});

server.listen(8080, () => {
  console.log('Server listening on port 8080');
});
