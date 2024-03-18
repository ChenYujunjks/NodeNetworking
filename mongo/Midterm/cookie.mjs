import express from 'express';

const app = express();

app.get('/', (req, res) => {
  // 设置一个名为"testCookie"的cookie，值为"Hello World"
  res.cookie('testCookie', 'Hello World');
  res.send('Cookie has been set');
});

const port = 3010;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});