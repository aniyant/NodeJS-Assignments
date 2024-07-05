//get all movies

const MovieModel = require("../models/movieModel");


const getMovies = async (req,res) =>{
    try{
        console.log(req.query);
        const { title, q, sortBy,order, page = 1, limit = 5 } = req.query;
        const filter = {};
    
        if (title) filter.title = title;
        if (q) filter.title = new RegExp(q, 'i');
    
        const options = {
          page: parseInt(page, 10),
          limit: parseInt(limit, 10),
          sort: sortBy ? { [sortBy]: order==="asc"? 1:-1 } : {}
        };
        console.log(filter)
        const movies = await MovieModel.paginate(filter, options);;
        res.status(200).json(movies);
    }catch(err){
        res.status(500).json({error:err.message});
    }
 
}

const postMovie = async (req, res) => {
    try{
        const movie = new MovieModel(req.body);
        await movie.save();
        res.status(201).json({movie:movie,message:"Movie saved successfully"});
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
}

const getSingleMovie = async (req, res) =>{
    try{
        let movie = await MovieModel.findById(req.params.id);
        if(!movie) return res.status(404).json({message: "Movie not found"});
        res.status(200).json(movie);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

const updateMovie = async (req, res) => {
    try{
        let movie = await MovieModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!movie) return res.status(404).json({message: "Movie not found"});
        res.status(200).json({movie:movie,message: "Movie updated successfully"});
    }catch(err){
        res.status(400).json({error:err.message});
    }
}

const deleteMovie = async (req, res) => {
    try{
        let movie = await MovieModel.findByIdAndDelete(req.params.id);
        if(!movie) return res.status(404).json({message: "Movie not found"});
        res.status(200).json({movie:movie,message: "Movie deleted"});
    }catch(err){
        res.status(500).json({error:err.message});
    }
}
module.exports = {
    getMovies,
    postMovie,
    getSingleMovie,
    updateMovie,
    deleteMovie,
};