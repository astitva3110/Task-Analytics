const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/user.repository');
const sendEmail = require('../utils/email.util');
const bcrypt = require('bcrypt')
const {isValidEmail}=require('../utils/validator.util')


exports.login = async (userData) => {
    try {
        const { identifier, password } = userData;
        console.log('Login attempt for identifier:', identifier,password);

        if (!identifier || !password) {
            throw new Error('Username/Email and password are required');
        }

        let user;

        if (isValidEmail(identifier)) {

            user = await userRepository.findByEmail(identifier);

        } else {

            user = await userRepository.findUserByUsername(identifier);

        }

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
            { expiresIn: '10h' }
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

        if (!userData.username || !userData.email || !userData.password || !userData.role || !userData.name) {
            throw new Error('Some fields are misssing')
        } 
        if (!isValidEmail(userData.email)) {
            throw new Error('Invalid email format');
        }
        
        const existingUserName = await userRepository.findUserByUsername(userData.username);

        if (existingUserName) {
            throw new Error('Username already exists');
        }

        const existingEmail = await userRepository.findByEmail(userData.email);

        if (existingEmail) {
            throw new Error('Email already registered');
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const newUser = await userRepository.createUser({
            ...userData,
            password: hashedPassword
        });

        console.log('New user created:', newUser);
        await sendEmail({
            to: userData.email,
            subject: 'Welcome to the Task',
            html: '<h1>Welcome to the plateform</h1><p>thanks you.</p>'
        }).catch(err => {
            console.error('Error sending welcome email:', err);
        });


        return newUser;

    }
    catch (error) {
        console.error(error);
        throw new Error('Registration failed: ' + error.message);
    }
}
