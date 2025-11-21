const userRepository = require('../repositories/user.repository');
const taskRepository = require('../repositories/task.repository');

exports.getUserById = async (username, loggedInUser) => {
    try {
      
        if (loggedInUser.username !== username) {
            throw new Error('Unauthorized access to tasks');
        }

     
        return await userRepository.findUserByUsername(username);

    } catch (error) {
        console.error('Error fetching user tasks:', error);
        throw error;
    }
};


exports.updateUserTasks = async (loggedInUser, taskid, status) => {
    try {
        const task = await taskRepository.findById(taskid);
        if (loggedInUser.id !== task.assignedTo) {
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