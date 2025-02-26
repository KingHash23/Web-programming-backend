// server.js - Express API server for user authentication

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt'); // For password hashing

const app = express();
const PORT = process.env.PORT || 3000;
const USERS_FILE = path.join(__dirname, 'users.json');

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Helper functions
function loadUsers() {
    if (!fs.existsSync(USERS_FILE)) {
        fs.writeFileSync(USERS_FILE, JSON.stringify({}, null, 2));
        return {};
    }
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
}

function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function validateEmail(email) {
    const emailRegex = /^[a-z0-9@._-]+$/;
    return email.includes('@') && emailRegex.test(email);
}

function validatePassword(password) {
    const regex = /^(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
}

// API Routes
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'All fields are required' 
            });
        }
        
        // Normalize email
        const normalizedEmail = email.toLowerCase();
        
        // Validate email format
        if (!validateEmail(normalizedEmail)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid email format. Email must contain an @ symbol and only lowercase letters, numbers, and symbols.' 
            });
        }
        
        // Check if user exists
        const users = loadUsers();
        if (users[normalizedEmail]) {
            return res.status(409).json({ 
                success: false, 
                message: 'Email already registered' 
            });
        }
        
        // Validate password
        if (!validatePassword(password)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Password must be at least 8 characters, contain 2 uppercase letters, 2 numbers, and 1 special character.' 
            });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Save user
        users[normalizedEmail] = { 
            name, 
            password: hashedPassword 
        };
        
        saveUsers(users);
        
        res.status(201).json({ 
            success: true, 
            message: 'Registration successful' 
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email and password are required' 
            });
        }
        
        // Normalize email
        const normalizedEmail = email.toLowerCase();
        
        // Check if user exists
        const users = loadUsers();
        const user = users[normalizedEmail];
        
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid credentials' 
            });
        }
        
        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid credentials' 
            });
        }
        
        // Login successful
        res.json({ 
            success: true, 
            name: user.name,
            email: normalizedEmail
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
});

// Get user profile
app.get('/api/profile/:email', (req, res) => {
    try {
        const email = req.params.email.toLowerCase();
        const users = loadUsers();
        
        if (!users[email]) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        res.json({
            success: true,
            name: users[email].name,
            email: email
        });
    } catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// Get all users (typically would be protected)
app.get('/api/users', (req, res) => {
    try {
        const users = loadUsers();
        
        // Create a safe version without passwords
        const safeUsers = {};
        for (const email in users) {
            safeUsers[email] = {
                name: users[email].name
            };
        }
        
        res.json({
            success: true,
            users: safeUsers
        });
    } catch (error) {
        console.error('Users error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// Serve index.html as the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});