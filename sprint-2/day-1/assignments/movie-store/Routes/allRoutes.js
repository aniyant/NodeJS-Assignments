const {Router} = require('express');
const { 
    getMovies
   , postMovie
   , getSingleMovie
   , updateMovie, 
   deleteMovie
} 
= require('../controllers/movieControllers');

const MovieRouter = Router();

MovieRouter.get('/', getMovies);
MovieRouter.post('/', postMovie);
MovieRouter.get('/:id', getSingleMovie);
MovieRouter.put('/:id', updateMovie);
MovieRouter.delete('/:id', deleteMovie);

module.exports = MovieRouter;