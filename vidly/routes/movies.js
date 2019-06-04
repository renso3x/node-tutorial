const express = require('express');
const validate = require('../utils/validate');

// returns a Router Object
const router = express.Router();

/*
  @movies list
  :title
  :genre
*/
const movies = [];

// REST API
router.get('/', (req, res) => {
  res.send(movies);
});

router.post('/', (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(500).send(error.details);
  }
  // add the movie
  const newMovie = Object.assign({}, req.body, {
    id: movies.length + 1
  });

  movies.push(newMovie);
  res.send(movies);
});

router.get('/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie)
    return res.status(404).send("Sorry we cannot find the movie you're looking for");

  res.send(movie);
});

router.put('/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie)
    return res.status(404).send("Sorry we cannot find the movie you're looking for");

  const { error } = validate(req.body);
  if (error) {
    res.status(500).send(error.details);
  }

  movie.title = req.body.title;
  movie.genre = req.body.genre;

  res.send(movie);
});

router.delete('/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie)
    return res.status(404).send("Sorry we cannot find the movie you're looking for");

  // find the index
  const index = movies.indexOf(movie);
  movies.splice(index, 1);

  res.send(movies);
});

module.exports = router;