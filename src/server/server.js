// server/server.js

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allows cross-origin requests
app.use(express.json()); // Parses incoming JSON requests

// Routes
app.post('/api/forms/submit', (req, res) => {
    const { userName, email, selectedStock } = req.body;

    // Example logic to determine the status (you can replace this with your actual logic)
    let status;
    if (selectedStock === 'stock1') {
        status = 'approved';
    } else if (selectedStock === 'stock2') {
        status = 'rejected';
    } else {
        status = 'manual';
    }

    // Respond with a JSON object
    res.json({ status });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
