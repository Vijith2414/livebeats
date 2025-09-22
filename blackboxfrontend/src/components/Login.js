import React, { useState } from 'react';
import { login } from '../api';


const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await login(formData);
            if (response.token) {
                localStorage.setItem('token', response.token);
                setMessage('Login successful!');
                window.location.href = '/home';
            } else {
                setMessage(response.error || 'Login failed');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container my-5">
            <h2 className="text-center">Login</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            {message && <p className="text-danger text-center mt-3">{message}</p>}
        </div>
    );
};

export default Login;