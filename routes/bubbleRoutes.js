const express = require('express');
const { body } = require('express-validator');

const bubbleController = require('../controllers/bubbleController');
const router = express.Router();

router.post('/createBubble',bubbleController.createBubble);


module.exports = router;