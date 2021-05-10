const express = require('express');
const { body } = require('express-validator');

const bubbleInvitationController = require('../controllers/bubbleInvitationController');
const router = express.Router();

router.post('/', bubbleInvitationController.postInvitation);
router.post('/accept', bubbleInvitationController.acceptInvitation);
router.post('/deny', bubbleInvitationController.denyInvitation);
router.post('/:id/deny', bubbleInvitationController.denyInvitation);
router.get('/:id', bubbleInvitationController.getInvitation);

module.exports = router;