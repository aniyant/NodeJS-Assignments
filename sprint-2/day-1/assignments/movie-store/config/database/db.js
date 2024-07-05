const mongoose = require('mongoose');

// Connect to MongoDB
const DBConnect = async function (url){
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}

module.exports = DBConnect;