const express = require('express');
const { body } = require('express-validator');

const assistanceController = require('../controllers/assistanceController');
const router = express.Router();

router.post('/consultFuture',assistanceController.consultFutureAssistance);
router.post('/consultOnDate',assistanceController.consultAssistanceOnDate);
router.post('/add', assistanceController.postAssistance);
router.post('/modify', assistanceController.modifyAssistance);
router.post('/', assistanceController.deleteAssistance);


module.exports = router;