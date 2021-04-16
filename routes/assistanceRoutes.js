const express = require('express');
const { body } = require('express-validator');

const assistanceController = require('../controllers/assistanceController');
const router = express.Router();

router.post('/', assistanceController.postAssistance);
router.delete('/', assistanceController.deleteAssistance);


module.exports = router;