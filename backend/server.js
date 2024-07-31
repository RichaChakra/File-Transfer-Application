// backend/server.js (HTTPS integration)
const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('path/to/private.key'),
    cert: fs.readFileSync('path/to/certificate.crt'),
};

const server = https.createServer(options, app);


// User registration
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Username and password are required.');
    }
    if (users[username]) {
        return res.status(400).send('User already exists');
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        users[username] = { password: hashedPassword };
        res.status(201).send('User registered');
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});

// User login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Username and password are required.');
    }
    try {
        const user = users[username];
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).send('Invalid credentials');
        }
        const token = jwt.sign({ username }, JWT_SECRET);
        res.json({ token });
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});

const { encrypt, decrypt } = require('./utils/encryption');

// ... existing code

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('send_file', (data) => {
        const { file, recipient } = data;
        const recipientSocket = io.sockets.sockets.get(recipient);
        if (recipientSocket) {
            const encryptedFile = encrypt(file);
            recipientSocket.emit('receive_file', { file: encryptedFile, sender: socket.id });
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// ... existing code

