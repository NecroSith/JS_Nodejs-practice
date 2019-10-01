
const http = require('http');

const server = http.createServer();
const port = 3000;
server.listen(port);

console.log('Listening on port ', port);