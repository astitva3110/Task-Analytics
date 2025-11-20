require('dotenv').config();

const app = require('./app');
const initLoaders = require('./loaders');

initLoaders()


const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    
  console.log(`Server listening on port ${PORT}`);
});

function shutdown() {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
  setTimeout(() => {
    console.error('Force exiting.');
    process.exit(1);
  }, 10000);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

module.exports = server;
