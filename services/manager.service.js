const taskRepository = require('../repositories/task.repository');
const userRepository = require('../repositories/user.repository');

exports.getManagerById = async (userId) => {
    try {
        const manager = await userRepository.findById(userId);
        if (!manager ) {
            return null;
        }
        return manager;
    } catch (error) {
        console.error('Error in getManagerById:', error);
        throw error;
    }
};

exports.getTasksByManagerId = async (managerId) => {
    try {
        const users = await userRepository.getUserByManagerId(managerId);
        const userIds = users.map(u => u._id);

        const tasks = await taskRepository.findByUser(userIds);
        if (!tasks || tasks.length === 0) {
            return [];
        }
        return tasks;
    } catch (error) {
        console.error('Error in getTasksByManagerId:', error);
        throw error;
    }
}

exports.updateTask = async (taskId, updateData) => {
    try {
        const Task = await taskRepository.findById(taskId);
        const User = await userRepository.findById(Task.assignedTo);
        const managerId = User.manager;
        if (User.manager !== managerId) {
            return null;
        }
        const updatedTask = await taskRepository.updateTaskById(taskId, updateData);
        return updatedTask;
    } catch (error) {
        console.error('Error in updateTask:', error);
        throw error;
    }
}

exports.createTask = async (taskData,managerId) => {
    try {

        if (!taskData.title || !taskData.description || !taskData.status || !taskData.priority || !taskData.assignedTo) {
            throw new Error('Missing required task fields');
        }

        const user = await userRepository.findById(taskData.assignedTo);

        if (!user) {
            throw new Error('Assigned user not found');
        }

        if(user.manager!=managerId){
            throw new Error('Not authorized to assign task to this user');
        }

        const newTask = await taskRepository.createTask(taskData);

        return newTask;

    } catch (error) {
        console.error('Error in createTask:', error);
        throw error;
    }
};