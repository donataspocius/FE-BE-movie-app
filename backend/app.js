const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} = require('./contollers/movie.controller.js');

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.DOMAIN || 'http://127.0.0.1:5500',
  })
);

// Conection to MongoDB
require('./config/db.js')(app, PORT, process.env.MONGODB_URI);

// Routes
// GET - get all movies
app.get('/api/movies', getMovies);

// POST - create single movie
app.post('/api/movies', createMovie);

// PUT - update single movie
app.put('/api/movies/:movieId', updateMovie);

// DELETE - delete single movie
app.delete('/api/movies/:movieId', deleteMovie);
