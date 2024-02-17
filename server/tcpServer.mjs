// 使用ES模块导入语法
import { createServer } from 'net';

const server = createServer(sock => {
  console.log('客户端已连接');

  sock.on('data', data => {
    console.log('收到数据：', data.toString());
    sock.write('你好，客户端！（这是一条从服务器发给客户端的信息）');
  });

  sock.on('close', () => {
    console.log('连接已关闭');
  });
});

server.listen(12345, () => {
  console.log('服务器正在监听端口12345');
});
