const { Schema, model } = require('mongoose');
const paginate = require('mongoose-paginate-v2');

const movieSchema = new Schema ({
    title:{type:String,unique:true, required:true},
    plot:{type:String, required:true},
    genre:{type:String, required:true},
    language:{type:String},
    runtime:{type:String},
    released:{type:String,required:true}
})

movieSchema.plugin(paginate);

const MovieModel = model('movie',movieSchema);

module.exports = MovieModel;