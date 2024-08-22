import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import UploadStock from './UploadStock';
import FormSubmission from './Formsubmission';
import Home from './Home';

function App() {
    return (
        <Router>
            <div className="app">
                <Navbar />
                <div className="content">
                    <Routes>
                        <Route path="/upload-stock" element={<UploadStock />} />
                        <Route path="/submit-form" element={<FormSubmission />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
