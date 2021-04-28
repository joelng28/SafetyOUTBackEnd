const express = require('express');
const { body } = require('express-validator');

const assistanceController = require('../controllers/assistanceController');
const router = express.Router();

router.post('/', assistanceController.postAssistance);
router.delete('/', assistanceController.deleteAssistance);
router.get('/', assistanceController.getNumAssistencies);


module.exports = router;