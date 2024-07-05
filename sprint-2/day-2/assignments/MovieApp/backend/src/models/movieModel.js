const {DataTypes} = require('sequelize');
const { sequelize } = require('../config/db');

const Movie = sequelize.define('Movie', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    plot: DataTypes.STRING,
    genre: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    duration: DataTypes.STRING,
    releaseDate: DataTypes.DATEONLY,
});

// Sync with the
sequelize.sync().then(() => {
    console.log('Database & tables created!');
  });
  
  module.exports = Movie;
