const EventEmitter = require('events');

const url = "http://superlogger.io/log";

class Logger extends EventEmitter {
    log(message) {
        console.log(message);
        // Raise an event
        this.emit('messageLogged', { id: 1, url: 'http://' });
        this.emit('logging', { message: 'test' });
    }
}

module.exports = Logger;