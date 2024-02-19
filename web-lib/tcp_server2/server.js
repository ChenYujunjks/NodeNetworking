const net = require('net');
const client = net.createConnection({ port: 8124 }, () => {
  console.log('已连接到服务器！');
  client.write('世界！');
});

client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});

client.on('end', () => {
  console.log('已从服务器断开');
});
