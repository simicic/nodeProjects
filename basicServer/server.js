const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const { unescape } = require('querystring');

const mimeTypes = {
  "html": 'text/html',
  "jpeg": "image/jpeg",
  "jpg": "image/jpg",
  "png": "image/png",
  "js": "text/js",
  "css": "text/css"
}

http.createServer(function(req, res){
  var uri = url.parse(req.url).pathname;
  var fileName = path.join(process.cwd(), unescape(uri));

  console.log('loading ' + uri);
  var stats;

  try {
    stats = fs.lstatSync(fileName); 
  } catch(e) {
    res.writeHead(404, { 'Content-type': 'text/plain'});
    res.write('404 Not Found\n');
    res.end();
    return;
  }

  if (stats.isFile()) {
    var mimeType = mimeTypes[fileName.split('.').reverse()[0]];
    res.writeHead(200, {'Content-type': mimeType});

    var fileStream = fs.createReadStream(fileName);
    fileStream.pipe(res);
  } else if (stats.isDirectory()){
    res.writeHead(302, {'location': 'index.html'});
    res.end();
  } else {
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.write('500 Internal Error\n');
  }
}).listen(3001);