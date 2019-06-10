const mongoose = require('mongoose');
const Joi = require('joi');

const schema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 10,
    maxlength: 255,
    required: true
  },
  email: {
    type: String,
    minlength: 10,
    maxlength: 255,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 1024,
    required: true
  }
});

const User = mongoose.model('User', schema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(10).max(255).required(),
    email: Joi.string().min(10).max(255).required().email(),
    password: Joi.string().min(8).max(1024).required()
  };
  return Joi.validate(user, schema);
}


exports.User = User;
exports.validateUser = validateUser;