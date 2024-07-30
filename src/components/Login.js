import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Error state

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/login', { username, password });
            setToken(response.data.token);
            setError(''); // Clear error on success
        } catch (error) {
            setError('Login failed. Please check your credentials.'); // Set error message
        }
    };

    return (
        <form onSubmit={handleLogin}>
            {error && <div className="alert alert-danger">{error}</div>}
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
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    );
};

export default Login;
