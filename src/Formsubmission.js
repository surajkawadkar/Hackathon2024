//this is preapproval form field needs to add 
import React, { useState } from 'react';
import axios from 'axios';

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
        <div>
            <h2>Submit Form for Approval</h2>
            <input name="userName" placeholder="Your Name" value={form.userName} onChange={handleChange} />
            <textarea name="requestDetails" placeholder="Request Details" value={form.requestDetails} onChange={handleChange} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default FormSubmission;
