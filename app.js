const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

const app = express();


const authRoute = require('./routes/auth.route');
const userRoute = require('./routes/user.route');
const managerRoute = require('./routes/manager.route');
const adminRoute = require('./routes/admin.route');


app.use(helmet());             
app.use(mongoSanitize()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/manager', managerRoute);
app.use('/api/v1/admin', adminRoute);





app.use((req, res, next) => {
	console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
	next();
});




// 404 handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// Error handler
app.use((err, req, res, next) => {
	const status = err.status || 500;
	res.status(status).json({ error: { message: err.message, status } });
});

module.exports = app;
