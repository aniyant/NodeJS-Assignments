const mongoose = require('mongoose');

// Connect to MongoDB

const connectToDB = async (url) => {
    try{
        await mongoose.connect(url);
        console.log("database connected");
    }
    catch(error){
        console.log(error);
    }
};

module.exports = connectToDB;