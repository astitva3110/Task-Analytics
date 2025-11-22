const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller');
const { limiter } =require('../middlewares/rateLimit.middleware')
const { authMiddleware } = require('../middlewares/auth.middleware');
const {allowRoles} = require('../middlewares/role.middleware');


router.get('/details', authMiddleware, allowRoles('admin','manager','user'), userController.getUserById);

router.patch('/tasks/:id', authMiddleware, allowRoles('user'), userController.updateUserTasks);

router.get('/tasks',authMiddleware, allowRoles('user'), userController.getUserTasks);

module.exports = router;
