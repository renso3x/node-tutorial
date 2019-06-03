const EventEmitter = require('events');

// Extending Event Emitter
class Logger extends EventEmitter {
  log(message) {
    //  Send an HTTP request
    console.log(message);

    // Raise an event
    this.emit('messageLogged', { id: 1, url: 'http:///' });
  }
}

module.exports = Logger;