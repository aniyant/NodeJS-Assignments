const Movie = require("../models/movieModel");

const getMovies = async(req,res) => {
    try{
        const movies = await Movie.findAll();
        res.status(200).json(movies);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}

const getSingleMovie = async(req,res) => {
    try{
        const movie = await Movie.findByPk(req.params.id);
        if(!movie) return res.status(404).json({message: "Movie not found"});
        res.status(200).json(movie);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}

const postMovie = async (req, res) => {
    console.log(req.body);
    try{
        const newMovie = await Movie.create(req.body);
        res.status(201).json(newMovie);
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
};

const updateMovie = async (req, res) => {
    try{
        const updatedMovie = await Movie.update(req.body, {where: {id: req.params.id}});
        if(updatedMovie[0] === 0) return res.status(404).json({message: "Movie not found"});
        res.status(200).json({message: "Movie updated successfully"});
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
}

const deleteMovie = async (req, res) => {
    try{
        const deletedMovie = await Movie.destroy({where: {id: req.params.id}});
        if(deletedMovie === 0) return res.status(404).json({message: "Movie not found"});
        res.status(200).json({message: "Movie deleted successfully"});
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}

// exports function
module.exports = {
    getMovies,
    getSingleMovie,
    postMovie,
    updateMovie,
    deleteMovie,
}