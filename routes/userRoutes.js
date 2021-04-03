const express = require('express');
const { body } = require('express-validator');

const userController = require('../controllers/userController');
const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/login', userController.logIn);
router.get('/consultaProfile', userController.consultaProfile);
router.get('/checkEmail/:email', userController.checkEmail);

module.exports = router;