var express = require('express');
var apiController = require('../controllers/api.controller.js');

var router = express.Router();

router.post('/login',apiController.login)
router.get('/calendar/:msv',apiController.calendar)
router.get('/point/:msv',apiController.showPoint)
router.post('/updateSV',apiController.updateSV)


module.exports = router;