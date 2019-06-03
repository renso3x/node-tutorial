const Logger = require('./log');
const logger = new Logger();

//Register a listener
logger.on('messageLogged', (eventArgs) => {
  console.log('Listener called', eventArgs);
});

logger.log('message');