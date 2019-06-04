const config = require('config');
const express = require('express');
const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// Log only if dev environment
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
}
/*
  @movies list
  :title
  :genre
*/
const movies = [];

// REST API
app.get('/api/movies', (req, res) => {
  res.send(movies);
});

app.post('/api/movies', (req, res) => {
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

app.get('/api/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie)
    return res.status(404).send("Sorry we cannot find the movie you're looking for");

  res.send(movie);
});

app.put('/api/movies/:id', (req, res) => {
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

app.delete('/api/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie)
    return res.status(404).send("Sorry we cannot find the movie you're looking for");

  // find the index
  const index = movies.indexOf(movie);
  movies.splice(index, 1);

  res.send(movies);
});

function validate(movie) {
  const schema = {
    title: Joi.string().min(3).required(),
    genre: Joi.any().valid(['Action', 'Adventure']).required()
  };

  return Joi.validate(movie, schema);
}

app.listen(config.get('port'), () => {
  console.log(`Application: ${config.get('name')}. Running in port ${config.get('port')}`)
});
