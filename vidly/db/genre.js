const mongoose = require('mongoose');
const Joi = require('joi');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
});

const Genre = mongoose.model('Genre', schema);

function validateGenre(movie) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(movie, schema);
}

module.exports = {
  Genre: Genre,
  genreSchema: schema,
  validateGenre: validateGenre,
};
