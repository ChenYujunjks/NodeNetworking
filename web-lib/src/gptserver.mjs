/*对于fs模块的使用，如果您想保持非阻塞的异步特性，
可能会倾向于使用fs.promises接口，这样可以使用async/await语法来处理异步操作，
使得代码更加简洁和易于理解。*/
import net from 'net';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// 由于ES6模块中没有__dirname变量，我们需要通过新的方式来获取
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = net.createServer(async (socket) => {
  socket.on('data', async (data) => {
    const request = data.toString();
    const requestLine = request.split('\n')[0];
    const requestParts = requestLine.split(' ');
    const requestPath = requestParts[1]; // 如 "/index.html"

    // 解析文件路径
    const filePath = path.join(__dirname, 'public', requestPath);

    try {
      const content = await fs.readFile(filePath);
      socket.write('HTTP/1.1 200 OK\r\n\r\n');
      socket.write(content);
      socket.end();
    } catch (err) {
      socket.write('HTTP/1.1 404 Not Found\r\n\r\n');
      socket.end();
    }
  });
});

server.listen(8080, 'localhost', () => {
  console.log('TCP server listening on localhost:8080');
});
