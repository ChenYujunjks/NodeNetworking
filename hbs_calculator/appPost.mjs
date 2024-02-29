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
app.get('/divide', (req,res)=>{
    res.render('divisionGet');
})

app.post('/divide', (req, res) => {
    if (!req.body) {
        res.render('divisionPost');
        return;
    }
    const { numerator, denominator } = req.body;
    if (denominator === '0') {
        // Handle division by zero error, optionally
        res.render('divisionPost', { error: 'Cannot divide by zero.' });
        return;
    }
    const result = numerator / denominator;
    // Render the divisionForm template with result
    res.render('divisionPost', { result: `${numerator} / ${denominator} = ${result}` });
});

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`);
});
