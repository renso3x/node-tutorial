const Joi = require('joi');

module.exports = function validate(movie) {
  const schema = {
    title: Joi.string().min(3).required(),
    genre: Joi.any().valid(['Action', 'Adventure']).required()
  };
  return Joi.validate(movie, schema);
}