import net from 'net';

const server = net.createServer(socket => {
  console.log('Client connected');

  socket.on('data', data => {
    console.log('Data received from client:', data.toString());
  });

  socket.on('end', () => {
    console.log('Client disconnected');
  });

  socket.write('Hello from server!\r\n');
  socket.end('Server closing connection.\r\n');
});

server.listen(8080, () => {
  console.log('Server listening on port 8080');
});
