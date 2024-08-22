//this is preapproval form field needs to add 
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './Navbarcss.css';

function FormSubmission() {
    const [form, setForm] = useState({ userName: '', requestDetails: '' });

    const handleChange = event => {
        const { name, value } = event.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = () => {
        axios.post('/api/forms/submit', form)
            .then(response => console.log('Form submitted successfully'))
            .catch(error => console.error('There was an error submitting the form!', error));
            // response message to pop up on screen wheather approved, reject or manual invervention required
    };

    return (
        <div className="form-submission">
            <h2>Submit Approval Form</h2>
            <form>
                <label htmlFor="username">Name:</label>
                <input type="text" id="username" required />
                
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" required />
                
                <label htmlFor="stock">Select Stock:</label>
                <select id="stock">
                    <option value="stock1">Stock 1</option>
                    <option value="stock2">Stock 2</option>
                </select>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default FormSubmission;
