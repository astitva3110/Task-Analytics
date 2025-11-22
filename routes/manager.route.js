const express = require('express');
const router = express.Router();
const managerController = require('../controllers/manager.controller');
const { limiter } = require('../middlewares/rateLimit.middleware');
const { authMiddleware } = require('../middlewares/auth.middleware');   
const { allowRoles } = require('../middlewares/role.middleware');



router.get('/tasks', limiter, authMiddleware, allowRoles('manager'), managerController.getManagerTasks);

router.put('/tasks/:id', limiter, authMiddleware, allowRoles('manager'), managerController.updateTask);

router.post('/tasks/create', limiter, authMiddleware, allowRoles('manager'), managerController.createTask);

module.exports = router;