var express = require('express');
var homeController = require('../controllers/home.controller.js');

var router = express.Router();

router.get('/class', homeController.lop);
router.post('/class/edit', homeController.edit);
router.post('/class/add', homeController.add_class);
router.get('/class/delete/:id', homeController.delete_class);
router.get('/account', homeController.account);
router.get('/delete/:table/:id', homeController.delete);
router.get('/student', homeController.student);
router.post('/student/update', homeController.update_student);
router.post('/student/add', homeController.insert_student);
router.get('/teacher', homeController.teacher);
router.post('/teacher/add', homeController.insert_teacher);
router.post('/teacher/update', homeController.update_teacher);
router.get('/subject', homeController.subject);
router.post('/subject/add', homeController.insert_subject);
router.post('/subject/update', homeController.update_subject);
router.get('/calendar', homeController.calendar);
router.get('/:table', homeController.select);
module.exports = router;