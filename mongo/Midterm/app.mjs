import express from 'express'
// 在 app.mjs 中正确导入 redirectMiddleware.mjs
import redirectMiddleware from './redirectMiddleware.mjs';

const app = express();
const port = 3000;

// 使用自定义重定向中间件，指定配置文件路径
app.use(redirectMiddleware('./text1.json'));

app.get('/one', (req, res) => {
  res.send('You have been redirected to /one');
});
app.get('/two', (req, res)=>{
    res.send('You have been redirected to /two')
})
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
