import * as webLib from './web-lib.mjs';
import * as path from "path";
import * as fs from "fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const configPath = path.join(__dirname, 'config.json');

fs.readFile(configPath, 'utf8', (err, data) => {
    if (err) {
        console.error("Failed to read config file:", err);
        return;
    }

    const config = JSON.parse(data);
    // root the direct and fullfil redirectmap
    const rootDir = path.join(__dirname, '..', config.root_directory); //correct path
    console.log("Server root directory:", rootDir); // print root 
    const redirectMap = config.redirect_map;

    // Create a new Instance HTTPServer
    const server = new webLib.HTTPServer(rootDir, redirectMap);

    // Start the server and listen on port 3000
    server.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
});
