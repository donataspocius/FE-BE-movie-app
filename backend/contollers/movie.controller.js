const Movie = require('../models/movie.model.js');
const serverErrorHandler = require('../utills/error.js');

const getMovies = async (_req, res) => {
  try {
    const movies = await Movie.find();
    res.json({ movies });
  } catch (error) {
    serverErrorHandler(error, res, 500, {
      message: 'Unable to retrieve movies',
    });
  }
};

const createMovie = async (req, res) => {
  const newMovie = req.body; // getting data from client

  try {
    // Saving data to MongoDB
    const movie = new Movie(newMovie);

    await movie.save();

    res.status(201).json({ message: 'Movie saved' });
  } catch (error) {
    serverErrorHandler(error, res, 500, {
      message: 'Movie not saved, try again later',
    });
  }
};

const updateMovie = async (req, res) => {
  const movieId = req.params.movieId;
  const updatedMovieData = req.body;

  try {
    await Movie.findByIdAndUpdate(movieId, updatedMovieData);
    const updatedMovie = await Movie.findById(movieId);

    res.json({ message: 'Movie updated', movie: updatedMovie });
  } catch (error) {
    serverErrorHandler(error, res, 500, {
      message: 'Movie not updated, try again later',
    });
  }
};

const deleteMovie = async (req, res) => {
  const movieId = req.params.movieId;

  try {
    await Movie.findByIdAndDelete(movieId);

    res.status(200).json({ message: 'Movie deleted' });
  } catch (error) {
    serverErrorHandler(error, res, 500, {
      message: 'Movie not deleted, try again later',
    });
  }
};

module.exports = { getMovies, createMovie, updateMovie, deleteMovie };
