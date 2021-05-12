const express = require('express');
const { body } = require('express-validator');

const userController = require('../controllers/userController');
const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/login', userController.logIn);
router.get('/getUserInfo/:userId', userController.getUserInfo);
router.get('/checkEmail/:email', userController.checkEmail);
router.post('/loginTerceros', userController.logInTerceros);
module.exports = router;