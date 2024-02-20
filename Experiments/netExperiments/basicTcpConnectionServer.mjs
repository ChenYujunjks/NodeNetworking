import net from 'net';

const server = net.createServer();

server.on('connection', clientsocket => {
    console.log('客户端已连接');

    clientsocket.on('data', data => {
        console.log('收到数据：', data.toString());
        clientsocket.write('你好，客户端！\r\n （这是一条从服务器发给客户端的信息）');
      });

    clientsocket.on('end', () => {
        console.log('Client disconnected');
    });
    clientsocket.on('close', () => {
        console.log('连接已关闭');
    });
    //clientsocket.end();
});

server.listen(12345, () => {
  console.log('Server listening on port 12345');
});