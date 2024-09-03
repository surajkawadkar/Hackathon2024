import React, { useState } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function FormSubmission() {
    const [form, setForm] = useState({
        userName: '',
        ticker: '',
        noOfStocks: '',
        price: '',
        selectedStock: ''
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        axios.post('http://localhost:5000/api/forms/submit', form)
            .then(response => {
                // Assuming response.data contains status: 'approved', 'rejected', or 'manual'
                const status = response.data.status;
                let message = '';
                let severity = 'info';

                if (status === 'approved') {
                    message = 'Your request has been approved!';
                    severity = 'success';
                } else if (status === 'rejected') {
                    message = 'Your request has been rejected.';
                    severity = 'error';
                } else if (status === 'manual') {
                    message = 'Manual intervention required.';
                    severity = 'warning';
                }

                setSnackbarMessage(message);
                setSnackbarSeverity(severity);
                setSnackbarOpen(true);
            })
            .catch(error => {
                console.error('There was an error submitting the form!', error);
                setSnackbarMessage('An error occurred while submitting the form.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            });
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div className="form-submission">
            <h2>Submit Approval Form</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userName">Broker Name:</label>
                <input type="text" id="userName" name="userName" value={form.userName} onChange={handleChange} required />
                
                <label htmlFor="ticker">Ticker Name:</label>
                <input type="text" id="ticker" name="ticker" value={form.ticker} onChange={handleChange} required />
                
                <label htmlFor="noOfStocks">Number of Stocks:</label>
                <input type="text" id="noOfStocks" name="noOfStocks" value={form.noOfStocks} onChange={handleChange} required />
                
                <label htmlFor="price">Price:</label>
                <input type="number" id="price" name="price" value={form.price} onChange={handleChange} required />

                <label htmlFor="selectedStock">Select Stock:</label>
                <select id="selectedStock" name="selectedStock" value={form.selectedStock} onChange={handleChange} required>
                    <option value="">--Select a stock--</option>
                    <option value="stock1">Stock 1</option>
                    <option value="stock2">Stock 2</option>
                </select>

                <button type="submit">Submit</button>
            </form>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default FormSubmission;
