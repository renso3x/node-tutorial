const express = require('express');
const winston = require('winston');
const app = express();

require('./startup/connection')();
require('./startup/logging')();
require('./startup/config')();
require('./startup/middleware')(app);
require('./startup/route')(app);

const port = process.env.PORT || 8001;
app.listen(port, () => {
  winston.info(`Application is running in port ${port}`);
});
