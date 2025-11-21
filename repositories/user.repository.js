const User = require('../models/User.model');

exports.findUserByUsername = async (username) => {
    return await User.findOne({ username });
};

exports.createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

exports.findById = async (id) => {
    return await User.findById(id);
};

exports.findByEmail = async (email) => {
    return await User.findOne({ email })
}

exports.updateUserTasks = async (userId, tasks) => {
    return await User.findByIdAndUpdate(userId, { tasks }, { new: true });
};

exports.getUserByManagerId = async (managerId) => {
    return await User.find({ manager: managerId });
};