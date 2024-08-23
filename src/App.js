import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadStock from './UploadStock'; // Assuming this is your component
import FormSubmission from './Formsubmission'; // Assuming this is your component
import Home from './Home'; // Assuming this is your component
import Navbar from './Navbar'; // Assuming this is your component
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Router>
            <div className="app">
                <Navbar />
                <div className="content">
                    <Routes>
                        {/* Define a route for the root URL */}
                        <Route path="/" element={<Home />} />

                        {/* Other routes */}
                        <Route path="/upload-stock" element={<UploadStock />} />
                        <Route path="/submit-form" element={<FormSubmission />} />
                    </Routes>
                </div>

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
        </Router>
    );
}

export default App;
