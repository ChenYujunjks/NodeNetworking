import express from 'express';
import hbs from 'hbs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
// 构造 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'hbs'); // 设置 hbs 为视图引擎
app.set('views', './views'); // 设置视图的目录

// 静态文件目录
app.use(express.static('public'));

//注册部分视图
hbs.registerPartials(__dirname + '/views/partials');

//定义路由
app.get('/', (req, res) => {
    res.render('index', {
        title: 'HBS Example',
        message: 'Hello, HBS!'
    });
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });