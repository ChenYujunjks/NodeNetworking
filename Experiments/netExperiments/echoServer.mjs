import net from 'net';

const server = net.createServer(socket => {
  socket.on('data', data => {
    console.log(`Echoing back: ${data.toString()}`);
    socket.write(data);
  });
});

server.listen(8081, () => {
  console.log('Echo Server listening on port 8081');
});
