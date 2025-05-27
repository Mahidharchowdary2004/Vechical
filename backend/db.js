const mongoose = require("mongoose");
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error('MongoDB URI is not defined in environment variables');
    process.exit(1);
}

// Log the URI (with credentials masked) for debugging
const maskedURI = mongoURI.replace(/mongodb(\+srv)?:\/\/([^:]+):([^@]+)@/, 'mongodb$1://***:***@');
console.log('Attempting to connect to MongoDB with URI:', maskedURI);

mongoose.set('strictQuery', false);
console.log('Attempting to connect to MongoDB...');

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    socketTimeoutMS: 45000, // How long to wait for operations to complete
    family: 4, // Use IPv4, skip trying IPv6
    maxPoolSize: 10, // Maximum number of connections in the pool
    minPoolSize: 5, // Minimum number of connections in the pool
    retryWrites: true,
    w: 'majority'
};

mongoose.connect(mongoURI, options)
    .then(() => {
        console.log('MongoDB Connection Successful');
        console.log('Connection state:', mongoose.connection.readyState);
    })
    .catch((err) => {
        console.error('MongoDB Connection Error:', err);
        // Log more details about the error
        if (err.name === 'MongoServerError') {
            console.error('MongoDB Server Error Details:', {
                code: err.code,
                codeName: err.codeName,
                message: err.message,
                name: err.name,
                stack: err.stack
            });
        }
        // Log connection state
        console.log('Connection state:', mongoose.connection.readyState);
    });

const connection = mongoose.connection;

connection.on('error', (err) => {
    console.error('MongoDB Connection Error:', err);
    console.log('Connection state:', mongoose.connection.readyState);
});

connection.on('disconnected', () => {
    console.log('MongoDB Disconnected');
    console.log('Connection state:', mongoose.connection.readyState);
});

connection.on('connected', () => {
    console.log('MongoDB Connected');
    console.log('Connection state:', mongoose.connection.readyState);
});

// Handle process termination
process.on('SIGINT', async () => {
    await connection.close();
    console.log('MongoDB Connection Closed');
    process.exit(0);
});

module.exports = mongoose;