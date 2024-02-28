import express from 'express';
import hbs from 'hbs';

const app = express();
const port = 3000;

// 设置Handlebars为视图引擎
app.set('view engine', 'hbs')
// middleware
app.use(express.urlencoded({ extended: true}))
// use a router to bind a callback, a request handler
// to a particular url
app.use(function(req, res, next) {
	console.log(req.method, req.path);
	next();
});
app.use(function(req, res, next) {
	console.log('hello---------------');
	next();
});
app.use(function(req, res, next) {
	res.set('Server', 'MY AMAZING SUPER COOL SERVER');
	next();
});
app.get('/', function(req, res){
	// sends back a response; that is all
	res.send('hello');
});
app.get('/faq', function(req, res) {
	res.send('you has q, i has answer');
});
app.get('/divide', (req, res) => {
   res.render('divisionForm');
})
app.post('/divide', (req, res) => {
   if (!req.body){
      res.render('divisionForm');
      return
   }
   //console.log(req.body, 'req:', req)
   const { numerator, denominator } = req.body;
   if (denominator === '0') {
      //Handle divisionForm by zero error, optionally
      res.render('divisionForm', {error: 'Cannot divide by zero.'});
      return;
   }
   const result = numerator / denominator;
   //res.send('youma ')
   res.render('divisionForm', {result: `${numerator} / ${denominator} = ${result}`});
});

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`);
});
