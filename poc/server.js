/* Tiny static server for the PoC — zero dependencies. node server.js */
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = __dirname, PORT = process.env.PORT || 8765;
const MIME = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css',
               '.svg':'image/svg+xml', '.json':'application/json' };
http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  const file = path.join(ROOT, url === '/' ? 'index.html' : url);
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('not found'); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'text/plain' });
    res.end(data);
  });
}).listen(PORT, () => console.log('ArthSakhi PoC → http://localhost:' + PORT));
