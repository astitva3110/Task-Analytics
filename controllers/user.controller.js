const userService = require('../services/user.service');


exports.getUserById = async (req, res) => {
    try {
        const username = req.params.username;
        const loggedInUser = req.user;

        const deatials = await userService.getUserById(username, loggedInUser);

        res.json(deatials);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.updateUserTasks = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const taskid = req.params.id;
        const newTasks = userService.updateUserTasks(loggedInUser,taskid, req.body);
        res.status(200).json(newTasks);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUserTasks = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const tasks = await userService.getUserTasks(loggedInUser);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }   
};