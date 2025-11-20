const jwt = require('jsonwebtoken');
const repositories = require('../repository/auth.repository');


exports.login = async ({ username, password }) => {
    const user = await repositories.findUserByUsername(username);
    if (!user) {
        throw new Error('Invalid username or password');
    }
    const isPasswordValid = await bcript.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid username or password');
    }
    const token = jwt.sign(
        { id: user._id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    return token;
};