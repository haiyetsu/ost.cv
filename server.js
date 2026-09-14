const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const host = '0.0.0.0';
const port = 3000;
const root = __dirname;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf'
};

http.createServer((req, res) => {
  const requestUrl = url.parse(req.url).pathname;
  const safePath = requestUrl === '/' ? '/index.html' : requestUrl;
  const filePath = path.normalize(path.join(root, safePath.replace(/^\//, '')));

  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(port, host, () => {
  console.log(`OST CV served at http://${host}:${port}`);
});
