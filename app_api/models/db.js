const mongoose = require('mongoose');
const readLine = require('readline');

// Environment variables
const host = process.env.DB_HOST || '127.0.0.1';
const user = process.env.DB_USER || ''; // Optional, set in .env if needed
const password = process.env.DB_PASS || ''; // Optional, set in .env if needed

// Database connection string with credentials
let dbURI;
if (user && password) {
  dbURI = `mongodb://${user}:${password}@${host}/travlr`;
} else {
  dbURI = `mongodb://${host}/travlr`;
}

// Build the connection string
const connect = () => {
  setTimeout(() => {
    mongoose.connect(dbURI); // No options needed, defaults are fine
  }, 1000);
};

// Monitor connection events
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Windows-specific listener for SIGINT
if (process.platform === 'win32') {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('SIGINT', () => {
    process.emit('SIGINT');
  });
}

// Configure for Graceful Shutdown
const gracefulShutdown = (msg) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    process.exit(0);
  });
};

// Event Listeners for process signals
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart');
  process.kill(process.pid, 'SIGUSR2');
});

process.on('SIGINT', () => {
  gracefulShutdown('app termination');
});

process.on('SIGTERM', () => {
  gracefulShutdown('app shutdown');
});

// Make initial connection to DB
connect();

// Import Mongoose schemas
require('./travlr'); // Ensure this file exists and exports a Mongoose model
require('./user');   // Ensure the 'users' schema is registered for Passport

module.exports = mongoose;
