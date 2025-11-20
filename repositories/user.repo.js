const User = require('../models/User.model');

exports.findUserByUsername = async (username) => {
    return await User.findOne({ username });
};