const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { limiter } = require('../middlewares/rateLimit.middleware');
const { authMiddleware } = require('../middlewares/auth.middleware');  
const {allowRoles} = require('../middlewares/role.middleware');

router.get('/dashboard', limiter, authMiddleware, allowRoles('admin'), adminController.getAdminDashboard);

router.patch('/assign/manager', limiter, authMiddleware, allowRoles('admin'), adminController.assignManager);

router.delete('/tasks/:id', limiter, authMiddleware,  allowRoles('admin'), adminController.deleteTask);


module.exports = router;