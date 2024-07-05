const { Router } = require('express');
const { getMovies, getSingleMovie, postMovie, updateMovie, deleteMovie } = require('../controllers/movieControllers');

const movieRouter = Router();

// Mock data for movies
movieRouter.get('/', getMovies);
movieRouter.get('/:id',getSingleMovie);
movieRouter.post('/',postMovie);
movieRouter.patch('/:id',updateMovie);
movieRouter.delete('/:id',deleteMovie);

module.exports = movieRouter;