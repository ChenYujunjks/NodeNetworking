import express from 'express';
import hbs from 'hbs';
import path from 'path'
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __filename= fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// 设置Handlebars为视图引擎
app.set('view engine', 'hbs')
// middleware
app.use(express.urlencoded({ extended: true}))
//静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
// 日志中间件
app.use(function(req, res, next) {
	console.log('req =>',req.method, req.path);
	next();
});
app.use(function(req, res, next) {
	console.log('Another Request------->>>> (sent by middleware');
	next();
});
//服务器标头
app.use(function(req, res, next) {
	res.set('Server', 'MY AMAZING SUPER COOL SERVER');
	next();
});

app.get('/', function(req, res){
	// sends back a response; that is all
	res.send('hello');
});
app.get('/divide', (req, res) => {
   //console.log(req.body)
   if (Object.keys(req.query).length === 0){
      console.log("NOTHING");
      res.render('divisionGet');
      return;
   }
   //console.log(req.body, 'req:', req)
   const { numerator, denominator} = req.query

   if (denominator === '0') {
      //Handle divisionForm by zero error, optionally
      res.render('divisionForm', {error: 'Cannot divide by zero.'});
      return;
   }else if (numerator === undefined || denominator ===undefined){
      res.render('divisionGet', {error: 'Both numerator and denominator are required.'});
      return;
   }
   const result = numerator / denominator;
   res.render('divisionGet', {result: `${numerator} / ${denominator} = ${result}`});
   return;
});

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`);
});
