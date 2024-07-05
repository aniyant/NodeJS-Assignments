const { Collection } = require('mongodb');
const mongoose = require('mongoose');
const { client } = require('../config/database2');


const getUsers = async (req, res) => {
  try {
    const { name, age } = req.query;
    const filter = {};

    if (name) filter.name = new RegExp(name, 'i'); // Case-insensitive search
    if (age) filter.age = parseInt(age, 10);

    console.log(filter);
  
    // const users = await mongoose.connection.db.collection('users').find(filter).toArray();
    // console.log(collection);
    const db = client.db('MoviesDB')
    const collection = db.collection('users')
    // console.log(collection);
    const users = await collection.find(filter).toArray();
    // console.log(mongoose.connection)
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
};

module.exports = { getUsers };
