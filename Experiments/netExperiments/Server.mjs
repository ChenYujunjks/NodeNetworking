import net from 'net';

const server = net.createServer();

server.on('connection', csocket => {
    console.log('客户端已连接');

    csocket.on('data', data => {
        console.log('收到数据：', data.toString());
        csocket.write('你好，客户端！\r\n （这是一条从服务器发给客户端的信息）');
      });

    csocket.on('end', () => {
        console.log('Client disconnected');
    });
    csocket.on('close', () => {
        console.log('连接已关闭');
    });
    //csocket.end('Server closing connection.\r\n');
});

server.listen(12345, () => {
  console.log('Server listening on port 12345');
});