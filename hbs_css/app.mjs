import express from 'express';
import hbs from 'hbs';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { Kaomoji } from './kaomoji.mjs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

const kaomojis = []; // create an instance of kaomojis

// Set hbs as the view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// If you have any helpers or partials to register
// hbs.registerPartials(path.join(__dirname, 'views/partials'));
// hbs.registerHelper('helperName', function(...) { ... });

// Middleware for static files
app.use(express.static(path.join(__dirname, 'public')));
// Use the express.urlencoded middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Custom middleware function to log request details
function logRequest(req, res, next) {
    console.log(`Method: ${req.method}`); // Log the request method (e.g., GET, POST)
    console.log(`Path: ${req.path}`); // Log the request path (the part of the URL following the domain)
    console.log(`Query: `, req.query); // Log the query string (the part of the URL following the '?')
    next(); // Call next() to pass control to the next middleware function
}

// Apply the custom logging middleware to all incoming requests
app.use(logRequest);

// Root URL redirects to /editor
app.get('/', (req, res) => {
  res.redirect('/editor');
});
// Route for /editor path
app.get('/editor', (req, res) => {
  res.render('editor');
});
app.get('/dictionary', (req, res) => {
  // 将kaomoji数据传递给视图
  res.render('list', { kaomojis: kaomojis });
});
app.post('/submit-text', (req, res) => {
  let message = req.body.message; // 获取用户提交的消息
  // 替换文本中的情绪词为对应的kaomoji
  kaomojis.forEach(kao => {
      kao.emotions.forEach(emotion => {
          // 简单的替换逻辑，可能需要根据实际情况调整以更精确地匹配和替换
          message = message.replace(new RegExp(`\\b${emotion}\\b`, 'gi'), kao.value);
      });
  });
  // 将处理后的消息发送回客户端
  res.send(`<p>${message}</p><a href="/editor">Back</a>`);
});

fs.readFile('./code-samples/kaomojiData.json', 'utf8', (err, data) => {
  if (err) {
      console.error('Error reading the file', err);
      return;
  }
  const jsonData = JSON.parse(data);
  jsonData.forEach(item => {
      kaomojis.push(new Kaomoji(item.value, item.emotions));
  });

  // After read and deal with the data then Listen on port
  app.listen(port, () => {
      console.log(`Server started; type CTRL+C to shut down`);
      console.log(kaomojis); // print the global variable
  });
  //return;
});