var https = require('https');
var fs = require('fs');
var index = fs.readFileSync('index.html');
var options = {
  key: fs.readFileSync('./e-key.pem'),
  cert: fs.readFileSync('./e.pem')
};

https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end(index);
}).listen(8001);