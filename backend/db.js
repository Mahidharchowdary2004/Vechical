const mongoose = require("mongoose");
require('dotenv').config();

function connectDB() {
    const mongoURI = process.env.MONGO_URI;
    
    if (!mongoURI) {
        console.error('MongoDB URI is not defined in environment variables');
        process.exit(1);
    }
    
    console.log('Attempting to connect to MongoDB...');
    
    mongoose.connect(mongoURI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
    }).then(() => {
        console.log('MongoDB Connection Successful');
    }).catch((err) => {
        console.error('MongoDB Connection Error:', err);
        // Log more details about the error
        if (err.name === 'MongoServerError') {
            console.error('MongoDB Server Error Details:', {
                code: err.code,
                codeName: err.codeName,
                message: err.message
            });
        }
    });

    const connection = mongoose.connection;

    connection.on('error', (err) => {
        console.error('MongoDB Connection Error:', err);
    });

    connection.on('disconnected', () => {
        console.log('MongoDB Disconnected');
    });

    // Handle process termination
    process.on('SIGINT', async () => {
        await connection.close();
        console.log('MongoDB Connection Closed');
        process.exit(0);
    });
}

connectDB();

module.exports = mongoose;