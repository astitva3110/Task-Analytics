const authService = require('../services/auth.service');



exports.login = async(req, res) => {
    try {
        const token = await authService.login(req.body.username, req.body.password);
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