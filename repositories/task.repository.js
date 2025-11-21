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