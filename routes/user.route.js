const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller');
const { limiter } =require('../middlewares/rateLimit.middleware')
const { authMiddleware } = require('../middlewares/auth.middleware');
const {allowRoles} = require('../middlewares/role.middleware');


router.get('/details', limiter, authMiddleware, allowRoles('admin','manager','user'), userController.getUserById);

router.patch('/tasks/:id', limiter, authMiddleware, allowRoles('user'), userController.updateUserTasks);

router.get('/tasks', limiter,authMiddleware, allowRoles('user'), userController.getUserTasks);

module.exports = router;
