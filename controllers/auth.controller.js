const authService = require('../services/auth.service');



exports.login = async(req, res,next) => {
    try {
        const token = await authService.login(req.body);
        res.status(200).json(
            {
                success: true,  
                message: 'Login successful',
                token: token
            })
    }
    catch (error) {
        next(error);
    }
}


exports.register = async (req, res, next) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json({
            success:true,  
            message: 'User registered successfully',
            user: user
        });
    } catch (error) {
        next(error);
    }
}


exports.logout = async (req, res, next) => {
    try {
        const result=await authService.logout(req);
        if (result === undefined) {
            return next();
        }
        res.status(200).json({  
            success: true,
            message: 'Logout successful'
        });
    } catch (error) {
        next(error);
    }
};