const express = require('express');
const { getUsers } = require('../controllers/userController');
const { validateQueryParams } = require('../middlewares/validationMiddleware');

const router = express.Router();

router.get('/', validateQueryParams, getUsers);

module.exports = router;
