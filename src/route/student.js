const express = require('express');
const router = express.Router();
const SortMiddleware = require('../app/middlewares/SortMiddleware');
const StudentController = require('../app/controllers/StudentController');


router.post('/create', StudentController.createStudent);
router.get('/delete', StudentController.deleteStudent);
router.post('/update', StudentController.updateStudent);
router.get('/get', StudentController.getStudent);
router.get('/', SortMiddleware ,StudentController.index);

module.exports = router;