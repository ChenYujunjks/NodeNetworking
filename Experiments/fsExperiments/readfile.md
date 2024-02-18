`readFile` 函数是 Node.js `fs`（文件系统）模块的一部分，用于异步读取文件的内容。它的参数如下：

1. **path**：
   - 类型：`string | Buffer | URL | FileHandle`
   - 描述：指定要读取文件的路径。可以是一个字符串，指明文件的路径（相对路径或绝对路径）。也可以是一个 `Buffer` 或 `URL` 对象，指定文件的路径。如果是 `FileHandle`，则直接读取这个已打开的文件。

2. **options**（可选）：
   - 类型：`string | { encoding?: string | null; flag?: string; }`
   - 描述：如果是字符串，则被视为字符编码（例如，`'utf8'`）。如果是对象，则可以包含两个属性：
     - `encoding`：指定文件读取时使用的字符编码。如果设置为 `null` 或未定义，文件内容将以原始的字节形式（`Buffer`）返回。
     - `flag`：指定在读取文件时使用的标志。默认值是 `'r'`，表示打开文件进行读取。
   - 注意：如果省略此参数，文件内容将以 `Buffer` 对象的形式返回。

3. **callback**：
   - 类型：`(err, data) => void`
   - 描述：当 `readFile` 操作完成时，将调用此回调函数。它接收两个参数：
     - `err`：如果读取文件过程中发生错误，`err` 参数会包含错误信息。如果没有发生错误，`err` 会是 `null` 或 `undefined`。
     - `data`：文件的内容。如果在 `options` 中指定了字符编码，则 `data` 是一个字符串；如果没有指定字符编码，`data` 将是一个 `Buffer`。

### 示例

读取文件并以字符串形式获取内容的示例：

```javascript
import { readFile } from 'fs';

const filePath = './example.txt'; // 文件路径

readFile(filePath, { encoding: 'utf8' }, (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File content:', data);
});
```

在这个示例中，`readFile` 用于异步读取当前目录下名为 `example.txt` 的文件。文件内容以 UTF-8 编码的字符串形式返回。如果读取成功，文件的内容会被输出到控制台；如果发生错误，错误信息会被打印出来。