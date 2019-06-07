const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  isGold: Boolean,
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: () => 'must be a valid number'
    }
  },
});

const Customer = mongoose.model('Customer', schema);

module.exports = Customer;