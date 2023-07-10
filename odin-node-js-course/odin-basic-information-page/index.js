const url = require('url');
const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3250;

const server = http.createServer((req, res) => {
  const uripath = url.parse(req.url).pathname;

  switch (uripath) {
    case '/':
    case '/index':
      readFile(res, './index.html');
      break;
    case '/about':
      readFile(res, './about.html');
      break;
    case '/contact-me':
      readFile(res,'./contact-me.html');
      break;
    case '/favicon.ico':  // To protect against favicon.io calls
      break;
    default:
      readFile(res, './404.html');
      break;
    };
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});   

function readFile(res, filePath) {
    const filePathConst = filePath;
    console.log(String('filePath: ' + filePath));
    fs.readFile(String(filePath), 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(data);
      });
}