const express = require('express');
const { body } = require('express-validator');

const assistanceController = require('../controllers/assistanceController');
const router = express.Router();

router.get('/consult',assistanceController.consultFutureAssistance);
router.post('/add', assistanceController.postAssistance);
router.post('/modify', assistanceController.modifyAssistance);
router.delete('/', assistanceController.deleteAssistance);


module.exports = router;