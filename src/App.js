// frontend/src/App.js
import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import FileTransfer from './components/FileTransfer';

const App = () => {
    const [token, setToken] = useState(null);

    return (
        <div className="container">
            {!token ? (
                <div>
                    <h1>File Transfer App</h1>
                    <Login setToken={setToken} />
                    <Register />
                </div>
            ) : (
                <FileTransfer token={token} />
            )}
        </div>
    );
};

export default App;
