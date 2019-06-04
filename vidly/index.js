const config = require('config');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const moviesRouter = require('./routes/movies');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// Routes
app.use('/api/movies', moviesRouter);

// Log only if dev environment
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
}

app.listen(config.get('port'), () => {
  console.log(`Application: ${config.get('name')}. Running in port ${config.get('port')}`);
  console.log(`App Password: ${config.get('password')}`)
});