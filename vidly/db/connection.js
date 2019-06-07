const mongoose = require('mongoose');

// connect
mongoose.connect('mongodb://localhost/vidly', {
  useNewUrlParser: true
})
  .then(() => console.log('You are now connected to mongodb'))
  .catch(() => console.log('Error connecting in mongodb'));

