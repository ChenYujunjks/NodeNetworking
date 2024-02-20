// 使用ES模块导入语法
import net from 'net';

const client = new net.Socket(); //允许更多配置

client.connect(12345, '127.0.0.1', () => {
  console.log('连接到服务器！');
  client.write('你好，服务器！');
});

client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});

client.on('end', () => {
  console.log('已从服务器断开连接');
});
