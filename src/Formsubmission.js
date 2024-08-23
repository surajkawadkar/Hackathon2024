import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './Navbarcss.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function FormSubmission() {
    const [form, setForm] = useState({ userName: '', email: '', selectedStock: '' });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');

    const handleChange = event => {
        const { name, value } = event.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        axios.post('/api/forms/submit', form)
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
            {/* <Navbar /> */}
            <h2>Submit Approval Form</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Name:</label>
                <input type="text" id="username" name="userName" value={form.userName} onChange={handleChange} required />
                
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
                
                <label htmlFor="stock">Select Stock:</label>
                <select id="stock" name="selectedStock" value={form.selectedStock} onChange={handleChange} required>
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
