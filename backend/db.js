const mongoose = require("mongoose");

function connectDB(){

    mongoose.connect(`mongodb+srv://nallapanenimahidhar2004:LpmwoYdr4euwYEyX@cluster0.oclfqi3.mongodb.net/?retryWrites=true&w=majority`, {useUnifiedTopology: true , useNewUrlParser: true})

    const connection = mongoose.connection

    connection.on('connected' , ()=>{
        console.log('Mongo DB Connection Successfull')
    })

    connection.on('error' , ()=>{
        console.log('Mongo DB Connection Error')
    })


}

connectDB()

module.exports = mongoose