const express = require("express");
require('dotenv').config();
const app = express();
const Car = require('./models/carModel');
const port = process.env.PORT || 5000;
const mongoose = require('./db');
app.use(express.json());
const path = require("path");
const usersRoute = require('./routes/usersRoute');
const carsRoute = require('./routes/carsRoute');
const bookingsRoute = require('./routes/bookingsRoute');

// API Routes
app.use("/api/cars/", carsRoute);
app.use("/api/users/", usersRoute);
app.use("/api/bookings/", bookingsRoute);

// Serve static files from the React app
if (process.env.NODE_ENV === "production") {
    const frontendBuildPath = path.join(__dirname, "../frontend/build");
    console.log('Frontend build path:', frontendBuildPath);
    
    // Check if the build directory exists
    if (require('fs').existsSync(frontendBuildPath)) {
        app.use(express.static(frontendBuildPath));
        
        app.get("*", (req, res) => {
            try {
                const indexPath = path.join(frontendBuildPath, "index.html");
                console.log('Serving index.html from:', indexPath);
                res.sendFile(indexPath);
            } catch (error) {
                console.error("Error serving frontend:", error);
                res.status(500).send("Error serving frontend application");
            }
        });
    } else {
        console.error('Frontend build directory not found at:', frontendBuildPath);
        app.get("*", (req, res) => {
            res.status(500).send("Frontend build files not found. Please ensure the frontend is built correctly.");
        });
    }
} else {
    app.get("/", (req, res) => {
        res.send("API is running..");
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Wait for MongoDB connection before starting the server
mongoose.connection.once('open', () => {
    app.listen(port, () => {
        console.log(`Node JS Server Started in Port ${port}`);
        console.log('Environment:', process.env.NODE_ENV);
    });
});
