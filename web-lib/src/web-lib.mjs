import * as path from "path";
import * as net from "net";
import * as fs from "fs";
import MarkdownIt from "markdown-it";

const MIME_TYPES = {
    "jpg" : "image/jpg",
    "jpeg" : "image/jpeg",
    "png" : "image/png",
    "html" : "text/html",
    "css" : "text/css",
    "txt" : "text/plain"
};

/**
 * returns the extension of a file name (for example, foo.md returns md)
 * @param fileName (String)
 * @return extension (String)
 */
function getExtension(fileName) {
    const formatPath = path.extname(fileName).toLowerCase();
    if (formatPath.startsWith(".")) {
        return formatPath.substring(1);
    }
    return formatPath;
}

/**
 * determines the type of file from a file's extension (for example,
 * foo.html returns text/html
 * @param: fileName (String)
 * @return: MIME type (String), undefined for unkwown MIME types
 */
function getMIMEType(fileName) {
    const ext = path.extname(fileName);
    return ext.length > 0 ? MIME_TYPES[ext.substring(1)] : null;
}

class Request {
    constructor(reqStr) {
        const [method, path] = reqStr.split(" ");
        this.method = method;
        this.path = path;
    }
}

class Response {

    static STATUS_CODES = {
        200 : "OK",
        308 : "Permanent Redirect",
        404 : "Page Not Found",
        500 : "Internal Server Error"
    };

    constructor(socket, statusCode = 200, version = "HTTP/1.1") {
        this.sock = socket;
        this.statusCode = statusCode;
        this.version = version;
        this.headers = {};
        this.body = null;
    }

    setHeader(name, value) {
        this.headers[name] = value;
        return this;
    }

    status(statusCode) {
        this.statusCode = statusCode;
        return this;
    }

    send(body) {
        this.body = body ?? "";
      
        if (!Object.hasOwn(this.headers, "Content-Type")) {
            this.headers["Content-Type"] = "text/html";
        }

        const statusCodeDesc = Response.STATUS_CODES[this.statusCode];

        const headersString = Object.entries(this.headers).reduce((s, [name, value]) => {
            return s + `${name}: ${value} \r\n`;
        }, "");

        this.sock.write(`${this.version} ${this.statusCode} ${statusCodeDesc}\r\n`);
        this.sock.write(`${headersString}\r\n`);
        this.sock.write(this.body);

        this.sock.end();
    }
}

class HTTPServer {
    constructor(rootDirFull, redirectMap) {
        this.rootDirFull = rootDirFull;
        this.redirectMap = redirectMap;
        this.server = net.createServer(this.handleConnection.bind(this));
    }

    listen(port, host) {
        this.server.listen(port, host);
    }

    handleConnection(sock) {
        sock.on("data", data => this.handleRequest(sock, data));
    }

    async handleRequest(sock, binaryData) {
        const req = new Request(binaryData.toString());
        const res = new Response(sock);
        const reqPathFull = path.join(this.rootDirFull, req.path);
        const reqPath = req.path;
        console.log("Requested path:", reqPathFull); // 打印请求的绝对路径

        // directory recursion bad request
        if (req.path.includes('..')){
            console.log("Bad Request: Invalid path attempt:", req.path); //print invalid path attempt
            res.status(400).send('Bad Request: Invalid path');
            return ;
        }
        // 1. handle redirects first
        // 2. if not a redirect and file/dir does not exist send back not found

        if (this.redirectMap[reqPath]) {
            res.status(308)// use 308 state code to do permanent redirect
            .setHeader('Location', this.redirectMap[reqPath])
            .send('');
            return;
        }

        try {
            const stat = await fs.promises.stat(reqPathFull);
             // 4. if dir, generate page that lists files and dirs contained in dir
            // web-lib.mjs HTTPServer  handleRequest method
            if (stat.isDirectory()) {
                // use  fs.readdir read dir
                fs.readdir(reqPathFull, { withFileTypes: true }, (err, files) => {
                    if (err) {
                        // send 500 if there is error
                        res.status(500).send('Internal Server Error');
                    } else {
                        // create
                        let content = '<!DOCTYPE html><html><head><title>Directory Listing</title></head><body>';
                        content += `<h2>Directory Listing for ${reqPath}</h2>`;
                        content += '<ul>';
                        for (const file of files) {
                            // 
                            const link = file.isDirectory() ? `${file.name}/` : file.name;
                            content += `<li><a href="${path.join(reqPath, link)}">${file.name}</a></li>`;
                        }
                        content += '</ul></body></html>';

                        // send HTML respond
                        res.setHeader('Content-Type', 'text/html').send(content);
                    }
                });
                return;
            }

            // 3. if file, serve file
            if (stat.isFile()) {
                const ext = getExtension(reqPathFull);
                const mimeType = getMIMEType(reqPathFull) || 'text/plain';
                const fileContents = await fs.promises.readFile(reqPathFull);
                
                // 5. if markdown, compile and send back html
                if (ext === 'md') {
                    const md = new MarkdownIt();
                    const html = md.render(fileContents.toString());
                    res.setHeader('Content-Type', 'text/html').send(html);
                } else {
                    res.setHeader('Content-Type', mimeType).send(fileContents);
                }
                return;
            }
        } catch (err) {
            if (err.code === 'ENOENT') {
                // if there's no such directory or file ,send 404
                res.status(404).send('Not Found');
            } else {
                //for other error，send 500
                res.status(500).send('Internal Server Error');
            }
        }
    }
}

export {
    Request,
    Response,
    HTTPServer
};