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
    const { userName, ticker,noOfStocks,price, selectedStock } = req.body;
    
    
    let restrictedTicker= ['RVNL', 'TITH']
    let whitelistedTicker = ['ITC','HDFCB']
    let status;
    if (restrictedTicker.includes(ticker) ) {
        // status = 'approved';
        status = 'rejected';
    } else if (whitelistedTicker.includes(ticker) ) {
        // status = 'rejected';
        status = 'approved';
    } else {
        status = 'manual';
    }
    // if (selectedStock === 'stock1') {
    //     status = 'approved';
    // } else if (selectedStock === 'stock2') {
    //     status = 'rejected';
    // } else {
    //     status = 'manual';
    // }

    // Respond with a JSON object
    res.json({ status });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
