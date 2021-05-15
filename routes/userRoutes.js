const express = require('express');
const { body } = require('express-validator');

const userController = require('../controllers/userController');
const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/login', userController.logIn);
router.get('/', userController.getUserId);
router.get('/:id', userController.getUserInfo);
router.get('/:id/friends', userController.getUserFriends);
router.get('/checkEmail/:email', userController.checkEmail);

router.get('/:id/bubbles', userController.getUserBubbles);
router.get('/:id/friendRequests', userController.getUserFriendRequests);
router.get('/:id/bubbleInvitations', userController.getUserBubbleInvitations);
router.post('/loginTerceros', userController.logInTerceros);

router.get('/:id/chats', userController.getUserChats);

module.exports = router;