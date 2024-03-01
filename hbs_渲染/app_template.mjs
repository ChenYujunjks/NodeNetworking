import express from 'express';

const app = express();
const port = 3056;

// 设置Handlebars为视图引擎
app.set('view engine', 'hbs')
// middleware
app.use(express.urlencoded({ extended: true}))
// use a router to bind a callback, a request handler
// to a particular url
app.use(function(req, res, next) {
	console.log('Another Request------->>>> (sent by middleware');
	next();
});
app.use(function(req, res, next) {
	res.set('Server', 'MY AMAZING SUPER COOL SERVER');
	next();
});
app.get('/', (req, res)=>{
	// sends back a response; that is all
	res.send('hello');
});
app.get('/templating-arrays', (req, res) => {
	res.render('templating-arrays', {'luckyNumbers':[42, 7, 78, 3, 5]});
});
app.get('/templating-objects',(req, res)=> {
	res.render('templating-objects', {'obj':{'topping':'mushroom', 'size':'medium'}});
});
app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`);
});
