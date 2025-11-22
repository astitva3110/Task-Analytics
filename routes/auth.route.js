const express = require('express');
const router = express.Router()
const authController = require('../controllers/auth.controller');
const { limiter } = require('../middlewares/rateLimit.middleware'); 

router.post('/login', limiter, authController.login);

router.post('/register', limiter, authController.register);



module.exports = router;