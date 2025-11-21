const authService = require('../services/auth.service');



exports.login = async(req, res,next) => {
    try {
        const token = await authService.login(req.body);
        res.status(200).json(
            {
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
            message: 'User registered successfully',
            user: user
        });
    } catch (error) {
        next(error);
    }
}
