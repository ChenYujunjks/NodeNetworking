const net = require('net');

const server = net.createServer((socket) => {
  console.log('客户端已连接');

  socket.on('data', (data) => {
    console.log(`从客户端收到: ${data}`);
  });

  socket.on('end', () => {
    console.log('客户端已断开连接');
  });

  socket.write('你好\r\n');
  socket.pipe(socket);
});

server.on('error', (err) => {
  throw err;
});

server.listen(8124, () => {
  console.log('服务器已启动，监听端口8124');
});
