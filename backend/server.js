const express = require("express");
const app = express();
const Car = require('./models/carModel');
const port = process.env.PORT || 5000;
const dbConnection = require('./db');
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
    // Set static folder
    app.use(express.static(path.join(__dirname, "../frontend/build")));

    app.get("*", (req, res) => {
        try {
            res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
        } catch (error) {
            console.error("Error serving frontend:", error);
            res.status(500).send("Error serving frontend application");
        }
    });
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

app.listen(port, () => console.log(`Node JS Server Started in Port ${port}`));
