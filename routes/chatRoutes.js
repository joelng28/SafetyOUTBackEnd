const express = require('express');
const { body } = require('express-validator');


const router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/:id/messages', chatController.getMessages);

module.exports = router;