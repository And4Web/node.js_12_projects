const http = require('http');

const hostname = '127.0.0.1';
const port = 5500;

const server = http.createServer((req, res)=>{
  res.writeHead(200, {'Content-type': "application/json"});
  res.end('Hello, Anand!');
})

server.listen(port, hostname, ()=>console.log(`Project 1 server running at Port: ${port} and host: ${hostname}}`))