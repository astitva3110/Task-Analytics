const express = require('express');
const router = espress.Router();
const managerController = require('../controllers/manager.controller');
const { limiter } = require('../middlewares/rateLimit.middleware');
const { authMiddleware } = require('../middlewares/auth.middleware');   


router.get('/details', limiter, authMiddleware, managerController.getManagerById);

router.get('/tasks', limiter, authMiddleware, managerController.getManagerTasks);

router.put('/tasks/:id', limiter, authMiddleware, managerController.updateTask);

router.post('/tasks/create', limiter, authMiddleware, managerController.createTask);

module.exports = router;