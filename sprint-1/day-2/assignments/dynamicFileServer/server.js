const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
    console.log(req.url);
    console.log(url.parse(req.url));
    let pathname = decodeURIComponent(url.parse(req.url).pathname);
    console.log(__dirname);
    let filepath = path.join(__dirname, pathname);
    console.log(filepath);

    // Function to generate HTML for directory listing
    function generateDirectoryListing(filepath) {
        let directoryContent = fs.readdirSync(filepath, { withFileTypes: true });
        let html = `
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; }
                    .icon { font-size: 1.2em; margin-right: 5px; }
                    .folder { color: #1a73e8; }
                    .file { color: #6f42c1; }
                    ul { list-style-type: none; padding-left: 0; }
                    li { margin-bottom: 5px; }
                    a { text-decoration: none; }
                    a:hover { text-decoration: underline; }
                </style>
            </head>
            <body>
                <h2>Directory Listing for ${pathname}</h2>
                <ul>
        `;
        directoryContent.forEach(item => {
            console.log(item);
            const icon = item.isDirectory() ? '' : ''; // Unicode icons for folder and file
            const itemPath = path.join(filepath, item.name);
            const itemUrl = path.join(pathname, item.name);
            html += `
                <li>
                    <span class="icon ${item.isDirectory() ? 'folder' : 'file'}">${icon}</span>
                    <a href="${itemUrl}">${item.name}</a>
                </li>
            `;
        });
        html += `
                </ul>
            </body>
            </html>
        `;
        return html;
    }

    // Serve directory listing or file content
    if (fs.existsSync(filepath)) {
        const stats = fs.statSync(filepath);
        console.log(`Is directory: ${stats.isDirectory()}`);
        console.log(`Is file: ${stats.isFile()}`);
        console.log(stats);
        if (stats.isDirectory()) {
            // Serve directory listing
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(generateDirectoryListing(filepath));
        } else {
            // Serve file content
            fs.readFile(filepath, (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end(data);
                }
            });
        }
    } else {
        // Not found
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`<html><head><title>404 Not Found</title></head><body><h1>404 Not Found</h1><p>The requested URL ${pathname} was not found on this server.</p></body></html>`);
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
