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
<<<<<<< HEAD
router.get('/calendar/modules/:id', homeController.lhp_calendar);
=======
router.post('/calendar/add', homeController.calendar_add);
router.get('/:table/:col/:val', homeController.select_col);
>>>>>>> f76bba4970303b228a414810e77099826ebe103d
router.get('/modules', homeController.lop_hoc_phan);
router.get('/modules/:lop', homeController.show_lop_hp);
router.get('/modules/addsv/:ma_mon_hoc', homeController.select_addSV);
router.post('/modules/addSV', homeController.insert_addSV);
router.post('/modules/editSV', homeController.editSV_lhp);
router.post('/modules/add', homeController.add_lop_hp);
router.post('/modules/update', homeController.update_lop_hp);
router.get('/:table', homeController.select);
module.exports = router;