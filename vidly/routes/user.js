const express = require('express');
const { User, validateUser } = require('../db/user');

// returns a Router Object
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(400).send('User already registered.');
  }

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  user = await user.save();

  res.send(user);
});

module.exports = router;