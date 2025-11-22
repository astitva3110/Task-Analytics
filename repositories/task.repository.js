const mongoose = require('mongoose')
const Task = require('../models/Task.model');

exports.findById = async (id) => {
    return await Task.findById(id);
}

exports.findByUserId = async (userId) => {
    return await Task.find({ assignedTo: userId });
}

exports.findTasksByManagerId = async (managerId) => {
    return await Task.find().populate({id: 'assignedTo', match: { manager: managerId } }).then(tasks => tasks.filter(task => task.assignedTo));
}

exports.updateTaskById = async (taskId, updateData) => {
    return await Task.findByIdAndUpdate(taskId, updateData, { new: true });
}

exports.createTask = async (taskData) => {
    const task = new Task(taskData);
    return await task.save();
}

exports.findByUser = async (userIds) => {   
    return await Task.find({ assignedTo: { $in: userIds } }).populate('assignedTo')
}

exports.getTaskStatistics = async () => {
    const stats = await Task.aggregate([
        {
            $group: {
                _id: null,
                total: { $sum: 1 },
                completed: {
                    $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] }
                },
                pending: {
                    $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] }
                },
                highPriority: {
                    $sum: { $cond: [{ $eq: ["$priority", "high"] }, 1, 0] }
                }
            }
        }
    ]);

    return stats[0] || {
        total: 0,
        completed: 0,
        pending: 0,
        highPriority: 0
    };
};
