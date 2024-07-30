// frontend/src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/register', { username, password });
            alert('Registration successful');
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <div className="form-group">
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-secondary">Register</button>
        </form>
    );
};

export default Register;
