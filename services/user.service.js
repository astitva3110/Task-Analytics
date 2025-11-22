const userRepository = require('../repositories/user.repository');
const taskRepository = require('../repositories/task.repository');

exports.getUserById = async (loggedInUser) => {
    try { 
        return await userRepository.findUserByUsername(loggedInUser.username);

    } catch (error) {
        console.error('Error fetching user tasks:', error);
        throw error;
    }
};


exports.updateUserTasks = async (loggedInUser, taskid, status) => {
    try {
        const task = await taskRepository.findById(taskid);
        console.log(loggedInUser.id, task.assignedTo);

        if (!task) {
            throw new Error('Task not found');
        }
        if (loggedInUser.id != task.assignedTo) {
            throw new Error('Unauthorized to update this task');
        }
        task.status = status;
        return await task.save();

    }
    catch (error) {
        console.error('Error updating user tasks:', error);
        throw error;
    }
}


exports.getUserTasks = async (loggedInUser) => {
    try {
        const tasks = await taskRepository.findByUserId(loggedInUser.id);
        return tasks;
    }
    catch (error) {
        console.error('Error fetching user tasks:', error);
        throw error;
    }
}   