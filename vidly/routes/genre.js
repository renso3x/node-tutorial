const express = require('express');
const validate = require('../utils/validate');
const Genre = require('../db/genre');

// returns a Router Object
const router = express.Router();

// REST API
router.get('/', async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(500).send(error.details);
  }

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) res.status(404).send("Sorry we cannot find the movie you're looking for");

  res.send(genre);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details);
  }
  const genre = await Genre.findByIdAndUpdate(req.params.id, {
    name: req.body.name
  }, { new: true });

  if (!genre)
    return res.status(404).send("Sorry we cannot find the genre you're looking for");

  res.send(genre);
});

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findOneAndRemove(req.params.id);

  if (!genre)
    return res.status(404).send("Sorry we cannot find the genre you're looking for");

  res.send(genre);
});

module.exports = router;