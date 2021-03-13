const express = require('express');
const { body } = require('express-validator');

const userController = require('../controllers/userController');
const router = express.Router();

router.put('/signup', userController.signUp);

module.exports = router;