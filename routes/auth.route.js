const express = require('express');
const router = express.Router()
const authController = require('../controllers/auth.controller');
const { limiter } = require('../middlewares/rateLimit.middleware'); 
const { authMiddleware } = require('../middlewares/auth.middleware');

router.post('/login', limiter, authController.login);

router.post('/register', limiter, authController.register);

router.post('/logout', limiter, authMiddleware, authController.logout);



module.exports = router;