const adminService = require('../services/admin.service');

exports.getAdminDashboard = async (req, res, next) => {
    try {
        const dashboardData = await adminService.getDashboardData();
        res.status(200).json({success:true, data: dashboardData });
    } catch (error) {
        next(error);
    }   
};

exports.assignManager = async (req, res, next) => {
    try {
        const { userId, managerId } = req.body;
        const updatedUser = await adminService.assignManagerToUser(userId, managerId);
        res.status(200).json({success:true, data: updatedUser });
    } catch (error) {
        next(error);
    }
};

exports.deleteTask = async (req, res, next) => {
    try {
        const taskId = req.params.id;
        const deletedTask = await adminService.deleteTaskById(taskId);
        res.status(200).json({success:true, data: deletedTask });
    } catch (error) {
        next(error);
    }
};