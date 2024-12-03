// backend/server.js

const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const bookRoutes = require('./routes/bookRoutes');
const cors = require('cors'); // Import cors

// Initialize Express app
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Use cors middleware

// Routes
app.use('/api/books', bookRoutes);

// Port configuration
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});