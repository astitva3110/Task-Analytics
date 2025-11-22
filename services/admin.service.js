const taskRepository = require('../repositories/task.repository');
const userRepository = require('../repositories/user.repository');


exports.getDashboardData = async () => {
    try {
        const userSatistics = await userRepository.getUserStatistics();
        const taskStatistics = await taskRepository.getTaskStatistics();
        console.log('Dashboard Data:', { userSatistics, taskStatistics });
        return {
            userSatistics,
            taskStatistics
        };
    } catch (error) {
        console.log('Error in getDashboardData:', error);
        throw new Error('Error fetching dashboard data');
    }
}

exports.assignManagerToUser = async (userId, managerId) => {
    try {
        const updatedUser = await userRepository.findById(userId);
        if (!updatedUser) {
            throw new Error('User not found');
        }
        updatedUser.manager = managerId;
        await updatedUser.save();
        return updatedUser;
    } catch (error) {
        console.log('Error in assignManagerToUser:', error);
        throw new Error('Error assigning manager to user');
    }
}


exports.deleteTaskById = async (taskId) => {
    try {
        const deletedTask = await taskRepository.updateTaskById(taskId, { isDeleted: true });
        if (!deletedTask) {
            throw new Error('Task not found');
        }
        return deletedTask;
    } catch (error) {
        console.log('Error in deleteTaskById:', error);
        throw new Error('Error deleting task');
    }
}