const mongoose = require("mongoose");

function connectDB(){
    const mongoURI = process.env.MONGO_URI || 'mongodb+srv://nallapanenimahidhar2004:LpmwoYdr4euwYEyX@cluster0.oclfqi3.mongodb.net/?retryWrites=true&w=majority';
    
    mongoose.connect(mongoURI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

    const connection = mongoose.connection;

    connection.on('connected', () => {
        console.log('Mongo DB Connection Successful');
    });

    connection.on('error', (err) => {
        console.log('Mongo DB Connection Error:', err);
    });
}

connectDB();

module.exports = mongoose;