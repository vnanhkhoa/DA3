var express = require('express');
var homeController = require('../controllers/home.controller.js');

var router = express.Router();

router.post('/editpass', homeController.edit_password);
router.get('/calendar', homeController.calendar);
router.get('/point', homeController.point);
router.get('/point/:lop', homeController.point_edit);
router.post('/point/edit', homeController.editPoint);
module.exports = router;