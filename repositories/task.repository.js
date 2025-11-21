const mongoose = require('mongoose')
const Task = require('../models/Task.model');

exports.findById = async (id) => {
    return await Task.findById(id);
}

exports.findByUserId = async (userId) => {
    return await Task.find({ assignedTo: userId });
}

