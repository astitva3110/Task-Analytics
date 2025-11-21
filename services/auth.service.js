const jwt = require('jsonwebtoken');
const repositories = require('../repositories/user.repository');
const sendEmail = require('../utils/email.util');
const bcrypt = require('bcrypt')


exports.login = async (userData) => {
    try {
        const user = await repositories.findUserByUsername(userData.username);
        if (!user) {
            throw new Error('Invalid username or password');
        }
        const isPasswordValid = await bcrypt.compare(userData.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid username or password');
        }
        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        return token;
    }
    catch (error) {
        console.error(error);
        throw new Error('Login failed: ' + error.message);
    }
};



exports.register = async (userData) => {
    try {
        const existingUser = await repositories.findUserByUsername(userData.username);
        if (existingUser) {
            throw new Error('Username already exists');
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = await repositories.createUser({
            ...userData,
            password: hashedPassword
        });
        await sendEmail(newUser.email, 'Welcome to Our Service', 'Thank you for registering!');
        return newUser;
    }
    catch (error) {
        console.error(error);
        throw new Error('Registration failed: ' + error.message);
    }
}
