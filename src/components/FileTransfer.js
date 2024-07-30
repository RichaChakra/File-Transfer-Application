import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { decrypt } from './utils/encryption'; // Assume we have a decryption utility in the frontend

const FileTransfer = ({ token }) => {
    // ... existing code

    useEffect(() => {
        const socket = io.connect('http://localhost:4000', {
            query: { token },
        });

        socket.on('receive_file', (data) => {
            const { file, sender } = data;
            const decryptedFile = decrypt(file); // Decrypt the file data
            console.log(`Received file from ${sender}`, decryptedFile);
        });

        return () => {
            socket.disconnect();
        };
    }, [token]);

    // ... existing code
};
