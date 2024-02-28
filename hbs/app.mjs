import express from 'express';
import hbs from 'hbs';

const app = express();
const port = 3000;

// 设置Handlebars为视图引擎
app.set('view engine', 'hbs')
/* 这段代码配置了Express应用程序使用Handlebars作为视图模板引擎。每一行代码都有特定的含义和作用，让我们逐一解析：

1. `app.engine('handlebars', engine());`
   - 这一行告诉Express应用程序要使用的模板引擎是Handlebars。`app.engine`方法接受两个参数：第一个参数是模板引擎的名称（这里是`'handlebars'`），第二个参数是这个模板引擎的实现。`engine()`函数来自于`express-handlebars`库，它是用于初始化Handlebars引擎的。这意味着你需要先通过`const { engine } = require('express-handlebars');`引入`engine`函数。

2. `app.set('view engine', 'handlebars');`
   - 通过这一行，Express应用程序被配置为使用Handlebars作为默认的视图引擎。这意味着当你调用`res.render`渲染视图时，Express会自动使用Handlebars模板引擎来处理这些文件。这里的`'handlebars'`是指定使用哪种模板引擎，名称需要与`app.engine`中注册的模板引擎名称相匹配。

3. app.set('views', './views');
   - 这行代码设置了存放视图文件的目录。Express会在这个目录下查找模板文件。`'./views'`是一个相对路径，指的是项目根目录下的`views`文件夹。这意味着所有的Handlebars模板文件（通常是`.handlebars`或`.hbs`扩展名的文件）应该放在项目根目录下的`views`文件夹中。通过这种方式，当你使用`res.render('templateName')`渲染一个模板时，Express就会在`views`文件夹中查找名为`templateName.handlebars`的文件。

总结来说，这些配置指示Express应用使用Handlebars作为模板引擎，并且默认地从项目根目录下的`views`文件夹中寻找模板文件。这是一个约定俗成的做法，使得项目结构更清晰，也方便开发者管理和维护视图文件。
*/
// 路由，使用箭头函数
app.get('/', (req, res) => {
   res.render('foo', { bar: 'hello' });
});

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`);
});
