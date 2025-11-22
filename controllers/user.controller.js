const userService = require('../services/user.service');


exports.getUserById = async (req, res) => {
    try {
        const loggedInUser = req.user;

        const detials = await userService.getUserById( loggedInUser);

        res.json(detials);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.updateUserTasks = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const taskid = req.params.id;
        const {status} = req.body;
        const newTasks = userService.updateUserTasks(loggedInUser,taskid, status);
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