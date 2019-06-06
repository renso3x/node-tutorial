
//Schema
const moviesSchema = new mongoose.Schema({
  title: String,
  genre: [String],
  isPublished: Boolean,
  author: String,
  releaseDate: { type: Date, default: Date.now }
});

// Model = Class
const Movie = mongoose.model('Movie', moviesSchema);

async function createMovie() {
  const movie = new Movie({
    title: 'Godzilla: King of the Monsters',
    genre: ['Action', 'Adventure', 'Fantasy'],
    isPublished: true,
    author: ' Michael Dougherty',
  });

  const result = await movie.save();

  console.log(result);
}

// createMovie();

async function getMovies() {
  const movies = await Movie.find()
    .sort({ title: 1 })
    .limit(10)
    .select({ title: 1, genre: 1 });

  console.log(movies)
}

getMovies();

