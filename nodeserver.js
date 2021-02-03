const http = require('http');


//const hostname = '127.0.0.1';
const hostname = '192.168.1.107';
const port = 8880;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});