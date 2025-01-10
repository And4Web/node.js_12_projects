const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const port = 5500;

const mimeTypes = {
  "html":"text/html",
  "jpeg":"image/jpeg",
  "jpg":"image/jpg",
  "png":"image/png",
  "js":"text/javascript",
  "css":"text/css",
}

http.createServer((req, res)=>{
  let uri = url.parse(req.url).pathname;
  let filePath = path.join(process.cwd(), unescape(uri));

  console.log("URL >>> ", req.url);
  console.log('Loading ' + uri + ' ' + filePath);
  
  let stats;

  try {
    stats = fs.lstatSync(filePath);
   
    console.log('stats >>> ', stats.isFile(), stats.isDirectory())
  } catch (error) {
    res.writeHead(404, {'Content-type': 'text/plain'});
    res.write('404 Not Found...\n');
    res.end();
    return;
  }
  if(stats.isFile()){
    let mimeType = mimeTypes[path.extname(filePath).split('.').reverse()[0]];
    res.writeHead(200, {'Content-type': mimeType});
    let fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  }else if(stats.isDirectory){
    res.writeHead(302, {'Location': 'project1/index.html'});
    res.end();
  } else{
    res.writeHead(500, {'Content-type': 'text/plain'});
    res.write('500 Internal Error\n');
    res.end()
  }
}).listen(port, () => console.log(`server running at Port: ${port} `));