const express = require('express');
const router = express.Router();

const registeController = require('../app/controllers/RegisterController');

router.post('/', registeController.register);
router.get('/', registeController.index);

module.exports = router;