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

const EventEmitter = require('events');
const emitter = new EventEmitter();

//  Register a listener
emitter.on('messageLogged', function() {
    console.log('Listener called');
})

// Raise an event
emitter.emit('messageLogged');