const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContactInformation = sequelize.define('ContactInformation',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:true,
        unique: true,
    },
    phoneNumber:{
        type:DataTypes.STRING,
        allowNull:true,
        unique: true,
    },
    primaryContactId:{
        type:DataTypes.INTEGER,
        allowNull:true
    }
},{
    timestamps: true,
});

module.exports = ContactInformation;