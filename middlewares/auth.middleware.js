const jwt = require('jsonwebtoken')

exports.authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode;
        console.log("DECODED USER:", req.user);
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
}