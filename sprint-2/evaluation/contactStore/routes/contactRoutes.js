const express = require('express');
const { identify, searchContacts } = require('../controllers/contactController');
const authenticate = require('../middlewares/auth');
const contactRouter = express.Router();

contactRouter.post('/identify',identify);
contactRouter.get('/contacts',authenticate,searchContacts); // contacts is authenticated;

module.exports = contactRouter;