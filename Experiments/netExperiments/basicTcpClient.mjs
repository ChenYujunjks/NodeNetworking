import net from 'net'

const client = new net.Socket(); //允许更多配置
client.connect(8080, '127.0.0.1', () => {
  console.log('Connected to server');
  client.write('Hello, server!');
});

client.on('data', (data) => {
  console.log('data received from server:', data.toString());
  client.end();
});

client.on('close', () => {
  console.log('Connection closed');
});
