const express = require('express');
const router = express.Router();
const SortMiddleware = require('../app/middlewares/SortMiddleware');
const accountController = require('../app/controllers/AccountController');


// router.use('/update', accountController.update);
router.get('/', SortMiddleware ,accountController.index);

module.exports = router;