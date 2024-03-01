1. 只需要
```javascript
// 设置Handlebars为视图引擎
app.set('view engine', 'hbs')
```
2. 扩展名hbs

3. 默认layouts 是  views 里面 有一个layout.hbs

### middileware
是的，几乎在所有情况下，当你的Express应用需要处理`POST`请求中的数据时，你都需要使用中间件来解析请求体。这是因为`POST`请求通常用来向服务器发送数据，这些数据被包含在请求体中。不同于`GET`请求，其中的数据是附加在URL上的，`POST`请求的数据是不可见的，因此需要特定的解析器来处理。

Express框架本身不会自动解析请求体中的数据，这意味着在没有适当的中间件处理之前，`req.body`将会是`undefined`。为了让这些数据在Express路由处理器中可用，必须使用如下中间件之一（或两者都用，取决于需要）：

- **`express.json()`**：用于解析JSON格式的请求体。当你期望从客户端接收JSON格式的数据时，应该使用这个中间件。
- **`express.urlencoded({ extended: true })`**：用于解析URL编码的数据（这是HTML表单数据的默认格式）。`extended: true`选项允许解析更复杂的对象结构，而`extended: false`使用较简单的对象和数组解析。这个中间件对于处理传统的HTML表单提交是必需的。

如果你的应用中没有处理`POST`请求的需求，那么可能不需要这些中间件。然而，对于大多数现代Web应用来说，处理`POST`请求是一个常见需求，用于接收用户输入的数据，如登录信息、表单提交等，因此在这些情况下，中间件是必需的。

总结来说，只要你需要在Express应用中处理`POST`请求体中的数据，就必须使用中间件来解析请求体。

## middleware 特征
是的，`app.get('/', {...})`中的回调函数实际上可以被视为一种特殊的中间件。在Express中，当你定义路由处理函数时，如：

```javascript
app.get('/', function(req, res) {
  res.send('Hello World!');
});
```

这里的函数`function(req, res) { res.send('Hello World!'); }`实际上是一个中间件，它接收请求对象（`req`）和响应对象（`res`）作为参数，并处理HTTP GET请求到根路径（`'/'`）的逻辑。这个函数直接结束了请求-响应循环，通过发送响应给客户端。

### 中间件的特征

中间件函数可以执行以下任务：

- 执行任何代码。
- 修改请求和响应对象。
- 结束请求-响应循环。
- 调用堆栈中的下一个中间件。

如果当前中间件函数不结束请求-响应循环，它必须调用`next()`方法来将控制权传递给下一个中间件，否则请求将会挂起。

### 路由处理函数作为中间件

在Express中，路由处理函数（如上面的例子）实际上是按照中间件的模式工作的，但通常它们会结束请求-响应循环，而不是调用`next()`来传递控制权。然而，你可以在路由处理中使用多个回调函数（中间件），只要除了最后一个之外的函数调用`next()`：

```javascript
app.get('/', function(req, res, next) {
  console.log('Middleware 1');
  next();
}, function(req, res) {
  res.send('Hello World!');
});
```

在这个例子中，第一个回调函数执行了一些操作（例如打印消息到控制台），然后调用`next()`将控制权传递给下一个中间件，即路由的最终处理函数，它发送响应给客户端。

这样，即使是简单的`app.get('/', {...})`路由定义，其回调函数也遵循中间件的工作方式，展示了Express中中间件概念的灵活性和强大功能。

---
### res req API
当使用`GET`请求提交表单时，表单数据会附加到URL中作为查询字符串，而不是放在请求体（`req.body`）中。因此，对于`GET`请求，你不会在`req.body`中找到数据。相反，你需要使用`req.query`来访问URL查询字符串中的数据。

### `req`（请求）对象包含的主要属性和方法：

- **`req.params`**: 一个对象，包含路由参数（URL的一部分，通常用于标识资源）。
- **`req.query`**: 一个对象，包含URL查询字符串的参数。
- **`req.body`**: 一个对象，包含POST或PUT请求的正文数据。对于`GET`请求，这个对象通常是空的，因为`GET`请求的数据通过URL的查询字符串发送。
- **`req.headers`**: 一个对象，包含请求的头信息（如`Content-Type`，`Authorization`等）。
- **`req.url`**或**`req.originalUrl`**: 请求的URL字符串。
- **`req.method`**: HTTP请求方法（如`GET`，`POST`等）。
- **`req.cookies`**: 一个对象，包含请求发送的cookies（如果使用了cookie解析中间件）。

### `res`（响应）对象包含的主要属性和方法：

- **`res.send(body)`**: 发送HTTP响应。`body`可以是一个Buffer对象、一个字符串、一个对象或一个数组。
- **`res.json(json)`**: 发送一个JSON响应。这个方法和`res.send()`类似，但会自动将对象转换成JSON字符串，并设置正确的`Content-Type`头。
- **`res.status(code)`**: 设置HTTP状态码。通常与`send`或`json`等方法链式调用。
- **`res.render(view, [locals], callback)`**: 使用视图引擎渲染视图，并发送渲染后的HTML字符串作为响应。`view`是视图文件的名称，`locals`是传递给视图的数据。
- **`res.redirect([status,] path)`**: 重定向到指定的URL。状态码是可选的，默认为`302 Found`。
- **`res.setHeader(name, value)`**: 设置响应头。
- **`res.cookie(name, value, [options])`**: 设置一个cookie。`options`是一个对象，可以用来指定cookie的属性，如`expires`、`path`等。

每个`req`和`res`对象都提供了丰富的API，以便开发者可以灵活地处理HTTP请求和响应。在处理请求时，你通常会根据请求类型（`GET`、`POST`等）和发送的数据（通过`req.params`、`req.query`或`req.body`访问）来决定响应的行为。

***
这段文本解释了为什么使用与应用程序逻辑解耦的模板引擎是有益的，以及如何安装和设置Handlebars（hbs）作为模板引擎，并介绍了如何在模板中使用上下文对象和变量。主要点包括：

1. **为什么使用模板引擎：**
   - 手动构造HTML在页面小的时候很简单，但随着标记的增加，这一过程会迅速变得复杂。
   - 寻找格式错误的HTML变得更加困难。
   - 应用程序的逻辑变化可能会与展示层的变化相互纠缠，二者之间的一些分离至少可以避免不想要的副作用。
   - 有了独立的模板，设计师或前端开发者可以独立于后端逻辑工作于模板上。
   - 大多数模板引擎提供了便利功能，例如自动字符转义，这对于防止例如跨站脚本攻击（XSS）这类的安全问题非常重要。

2. **安装和设置：**
   - 通过`npm install hbs --save`命令安装Handlebars。
   - 使用`app.set('view engine', 'hbs');`配置Handlebars作为模板引擎。
   - 模板文件通常存放在`views`目录下，例如`layout.hbs`和`index.hbs`。

3. **上下文对象：**
   - 在使用`res.render`渲染模板时，会传入两个参数：要渲染的视图（或模板）和上下文对象。
   - 上下文对象的属性可以在模板中作为变量名使用。例如，`res.render('myview', {'item':'pizza', 'description':'tasty'});`将允许在模板中通过`{{description}} {{item}}`插入这些值，输出为“tasty pizza”。

4. **逻辑和结构：**
   - Handlebars支持一些基本的逻辑和结构处理能力，如循环和条件判断，使得在模板中处理数组或对象等数据结构变得更加灵活和强大。

通过这段文本，可以了解到使用模板引擎的好处，以及如何通过Handlebars快速开始模板渲染，进而提升Web开发的效率和安全性。