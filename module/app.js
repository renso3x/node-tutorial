// module is wrapped in a function

const path = require('path');
console.log(__filename);
console.log(path.join(__dirname, 'src'));

const logger = require('./logger');

logger('test')