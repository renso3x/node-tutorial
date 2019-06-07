const Joi = require('joi');

module.exports = function validate(movie) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(movie, schema);
};

