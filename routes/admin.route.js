const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { limiter } = require('../middlewares/rateLimit.middleware');
const { authMiddleware } = require('../middlewares/auth.middleware');  
const {allowRoles} = require('../middlewares/role.middleware');

router.get('/dashboard', authMiddleware, allowRoles('admin'), adminController.getAdminDashboard);

router.patch('/assign/manager', authMiddleware, allowRoles('admin'), adminController.assignManager);

router.delete('/tasks/:id', authMiddleware,  allowRoles('admin'), adminController.deleteTask);


module.exports = router;