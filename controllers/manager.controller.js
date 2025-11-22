const managerService = require('../services/manager.service');




exports.getManagerTasks = async (req, res, next) => {
    try {
        const managerId = req.user.id;
        const tasks = await managerService.getTasksByManagerId(managerId);
        res.status(200).json({success:true, tasks: tasks });
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
            return res.status(404).json({ success:false, message: 'Task not found or not authorized' });
        }   
        res.status(200).json({ success:true, updatedTask });
    } catch (error) {
        next(error);
    }
};

exports.createTask = async (req, res, next) => {
    try {
        const managerId = req.user.id;
        const taskData = req.body;
        const newTask = await managerService.createTask(taskData,managerId);
        res.status(201).json({success:true, newTask: newTask });
    } catch (error) {
        next(error);
    }
};