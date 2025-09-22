import React, { useState } from 'react';
import { signup } from '../api';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password1: '',password2: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData); // Log the form data
        const response = await signup(formData);
        setMessage(response.message || 'Signup failed');
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password1" placeholder="Password" onChange={handleChange} required />
                <input type="password" name="password2" placeholder="Confirm_Password" onChange={handleChange} required />
                <button type="submit">Signup</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Signup;