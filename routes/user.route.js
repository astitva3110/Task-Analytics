const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller');
const { limiter } =require('../middlewares/rateLimit.middleware')
const {authMiddleware} = require('../middlewares/auth.middleware');


router.get('/details', limiter, authMiddleware, userController.getUserById);

router.patch('/tasks/:id', limiter, authMiddleware, userController.updateUserTasks);

router.get('/task', limiter,authMiddleware, userController.getUserTasks);

module.exports = router;
