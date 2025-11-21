const managerService = require('../services/manager.service');


exports.getManagerById = async (req, res, next) => {
    try {
        const managerId = req.user.id;
        const manager = await managerService.getManagerById(managerId);
        if (!manager) {
            return res.status(404).json({ message: 'Manager not found' });
        }
        res.status(200).json(manager);
    } catch (error) {
        next(error);
    }
};

exports.getTasks = async (req, res, next) => {
    try {
        const managerId = req.user.id;
        const tasks = await managerService.getTasksByManagerId(managerId);
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

exports.updateTask = async (req, res, next) => {
    try {
        const taskId = req.params.id;
        const updateData = req.body;
        const updatedTask = await managerService.updateTask(taskId, updateData);
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found or not authorized' });
        }   
        res.status(200).json(updatedTask);
    } catch (error) {
        next(error);
    }
};

exports.createTask = async (req, res, next) => {
    try {
        const managerId = req.user.id;
        const taskData = req.body;
        const newTask = await managerService.createTask(taskData,managerId);
        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
};