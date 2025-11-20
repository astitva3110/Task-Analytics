const express = require('express');

const app = express();


const authRoute=require('./routes/auth.route');

// Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/auth', authRoute);


// Simple request logger
app.use((req, res, next) => {
	console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
	next();
});

// Health check
app.get('/health', (req, res) => {
	res.json({ status: 'ok', uptime: process.uptime() });
});

// Try to mount routes from ./routes if present
try {
	const routes = require('./routes');
	if (typeof routes === 'function') app.use('/', routes);
} catch (err) {
	// no-op: keep app usable even when no routes directory exists
}

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
