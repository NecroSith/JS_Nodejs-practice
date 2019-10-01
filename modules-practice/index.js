/// ----------- Path Module ----------- /// 

const path = require('path');

const pathObjFile = path.parse(__filename);
const pathObjDir = path.parse(__dirname);

console.log(pathObjFile);
console.log(pathObjDir);

/// ----------- OS Module ----------- /// 

const os = require('os');

const totalMemory = os.totalmem();
const freeMemory = os.freemem();

console.log(`Total memory: ${totalMemory}`);
console.log(`Free memory: ${freeMemory}`);

/// ----------- File system module ----------- ///

const fs = require('fs');

// const files = fs.readdirSync('./');
// console.log(files);

fs.readdir('./', (err, files) => {
    if (err) console.log(err)
    else console.groupCollapsed(files)
})

/// ----------- Events module ----------- ///

// const EventEmitter = require('events');
// const emitter = new EventEmitter();

const Logger = require('./logger');
const logger = new Logger();

//  Register a listener
logger.on('messageLogged', (args) => {
    console.log('Listener called', args);
});


logger.on('logging', (args) => {
    console.log('Logging...', args)
});

logger.log('message');

/// ----------- HTTP module ----------- ///

const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello, world!');
        res.end();
    }
    if (req.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});
const port = 3000;

server.on('connection', (socket) => {
    console.log('New connection...');
})
server.listen(port);

console.log('Listening on port ', port);