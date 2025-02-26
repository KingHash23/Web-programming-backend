// // // server.js - API server for user authentication

// // const express = require('express');
// // const bodyParser = require('body-parser');
// // const fs = require('fs');
// // const bcrypt = require('bcrypt');
// // const path = require('path');

// // const app = express();
// // const PORT = process.env.PORT || 3000;
// // const USERS_FILE = path.join(__dirname, 'users.json');

// // // Middleware
// // app.use(bodyParser.json());
// // app.use(express.static(path.join(__dirname, 'public')));

// // // Helper functions
// // function loadUsers() {
// //     if (!fs.existsSync(USERS_FILE)) {
// //         fs.writeFileSync(USERS_FILE, JSON.stringify({}, null, 2));
// //         return {};
// //     }
// //     return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
// // }

// // function saveUsers(users) {
// //     fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
// // }

// // function validateEmail(email) {
// //     const emailRegex = /^[a-z@.]+$/;
// //     return email.includes('@') && emailRegex.test(email);
// // }

// // function validatePassword(password) {
// //     const regex = /^(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
// //     return regex.test(password);
// // }

// // // API Routes
// // app.post('/api/register', async (req, res) => {
// //     try {
// //         const { name, email, password } = req.body;
        
// //         // Validate input
// //         if (!name || !email || !password) {
// //             return res.status(400).json({ 
// //                 success: false, 
// //                 message: 'All fields are required' 
// //             });
// //         }
        
// //         // Validate email format
// //         if (!validateEmail(email)) {
// //             return res.status(400).json({ 
// //                 success: false, 
// //                 message: 'Invalid email format. Email must contain only lowercase letters, symbols, and an @ symbol.' 
// //             });
// //         }
        
// //         // Check if user exists
// //         const users = loadUsers();
// //         if (users[email]) {
// //             return res.status(409).json({ 
// //                 success: false, 
// //                 message: 'Email already registered' 
// //             });
// //         }
        
// //         // Validate password
// //         if (!validatePassword(password)) {
// //             return res.status(400).json({ 
// //                 success: false, 
// //                 message: 'Password must be at least 8 characters, contain 2 uppercase letters, 2 numbers, and 1 special character.' 
// //             });
// //         }
        
// //         // Hash password
// //         const hashedPassword = await bcrypt.hash(password, 10);
        
// //         // Save user
// //         users[email] = { 
// //             name, 
// //             password: hashedPassword 
// //         };
        
// //         saveUsers(users);
        
// //         res.status(201).json({ 
// //             success: true, 
// //             message: 'Registration successful' 
// //         });
// //     } catch (error) {
// //         console.error('Registration error:', error);
// //         res.status(500).json({ 
// //             success: false, 
// //             message: 'Server error' 
// //         });
// //     }
// // });

// // app.post('/api/login', async (req, res) => {
// //     try {
// //         const { email, password } = req.body;
        
// //         // Validate input
// //         if (!email || !password) {
// //             return res.status(400).json({ 
// //                 success: false, 
// //                 message: 'Email and password are required' 
// //             });
// //         }
        
// //         // Check if user exists
// //         const users = loadUsers();
// //         const user = users[email];
        
// //         if (!user) {
// //             return res.status(401).json({ 
// //                 success: false, 
// //                 message: 'Invalid credentials' 
// //             });
// //         }
        
// //         // Verify password
// //         const isPasswordValid = await bcrypt.compare(password, user.password);
        
// //         if (!isPasswordValid) {
// //             return res.status(401).json({ 
// //                 success: false, 
// //                 message: 'Invalid credentials' 
// //             });
// //         }
        
// //         // Login successful
// //         res.json({ 
// //             success: true, 
// //             name: user.name 
// //         });
// //     } catch (error) {
// //         console.error('Login error:', error);
// //         res.status(500).json({ 
// //             success: false, 
// //             message: 'Server error' 
// //         });
// //     }
// // });

// // // Serve index.html as the main page
// // app.get('/', (req, res) => {
// //     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// // });

// // // Start server
// // app.listen(PORT, () => {
// //     console.log(`Server running on port ${PORT}`);
// // });
// // server.js - API server for user authentication

// // const express = require('express');
// // const bodyParser = require('body-parser');
// // const fs = require('fs');
// // const bcrypt = require('bcrypt');
// // const path = require('path');

// // const app = express();
// // const PORT = process.env.PORT || 3000;
// // const USERS_FILE = path.join(__dirname, 'users.json');

// // // Middleware
// // app.use(bodyParser.json());
// // app.use(express.static(path.join(__dirname, 'public')));

// // // Serve module files with the correct MIME type
// // app.use((req, res, next) => {
// //     if (req.url.endsWith('.js')) {
// //         res.setHeader('Content-Type', 'application/javascript');
// //     }
// //     next();
// // });

// // // Load modules
// // const { RegisterManager } = require('./registerUser');
// // const { LoginManager } = require('./login');
// // const { AccessMenu } = require('./accessMenu');

// // // Helper functions
// // function loadUsers() {
// //     if (!fs.existsSync(USERS_FILE)) {
// //         fs.writeFileSync(USERS_FILE, JSON.stringify({}, null, 2));
// //         return {};
// //     }
// //     return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
// // }

// // function saveUsers(users) {
// //     fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
// // }

// // // Create managers
// // const userDataManager = {
// //     loadUsers,
// //     saveUsers
// // };

// // const registerManager = new RegisterManager(userDataManager);
// // const loginManager = new LoginManager(userDataManager);
// // const accessMenu = new AccessMenu(userDataManager);

// // // API Routes
// // app.post('/api/register', async (req, res) => {
// //     try {
// //         const { name, email, password } = req.body;
// //         const result = await registerManager.registerUser(name, email, password);
        
// //         if (result.success) {
// //             res.status(201).json(result);
// //         } else {
// //             res.status(400).json(result);
// //         }
// //     } catch (error) {
// //         console.error('Registration error:', error);
// //         res.status(500).json({ 
// //             success: false, 
// //             message: 'Server error' 
// //         });
// //     }
// // });

// // app.post('/api/login', async (req, res) => {
// //     try {
// //         const { email, password } = req.body;
// //         const result = await loginManager.loginUser(email, password);
        
// //         if (result.success) {
// //             res.json(result);
// //         } else {
// //             res.status(401).json(result);
// //         }
// //     } catch (error) {
// //         console.error('Login error:', error);
// //         res.status(500).json({ 
// //             success: false, 
// //             message: 'Server error' 
// //         });
// //     }
// // });

// // app.get('/api/profile/:email', (req, res) => {
// //     try {
// //         const { email } = req.params;
// //         const result = accessMenu.getUserProfile(email);
        
// //         if (result.success) {
// //             res.json(result);
// //         } else {
// //             res.status(404).json(result);
// //         }
// //     } catch (error) {
// //         console.error('Profile error:', error);
// //         res.status(500).json({ 
// //             success: false, 
// //             message: 'Server error' 
// //         });
// //     }
// // });

// // // Serve index.html as the main page
// // app.get('/hello', (req, res) => {
// //     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// // });

// // // Start server
// // app.listen(PORT, () => {
// //     console.log(`Server running on port ${PORT}`);
// //     console.log(`Visit http://localhost:${PORT} to access the application`);
// // });


// // server.js - API server for user authentication

// // const express = require('express');
// // const bodyParser = require('body-parser');
// // const fs = require('fs');
// // const bcrypt = require('bcrypt');
// // const path = require('path');

// // const app = express();
// // const PORT = process.env.PORT || 3000;
// // const USERS_FILE = path.join(__dirname, 'users.json');

// // // Middleware
// // app.use(bodyParser.json());
// // app.use(express.static(path.join(__dirname, 'public')));

// // // Helper functions
// // function loadUsers() {
// //     try {
// //         if (!fs.existsSync(USERS_FILE)) {
// //             return {};
// //         }
// //         const data = fs.readFileSync(USERS_FILE, 'utf-8');
// //         return data ? JSON.parse(data) : {};
// //     } catch (error) {
// //         console.error('Error loading users:', error);
// //         return {};
// //     }
// // }

// // function saveUsers(users) {
// //     fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
// // }

// // // API Routes
// // app.post('/api/register', async (req, res) => {
// //     try {
// //         const { name, email, password } = req.body;
// //         const users = loadUsers();
// //         const hashedPassword = await bcrypt.hash(password, 10);
// //         users[email] = { name, password: hashedPassword };
// //         saveUsers(users);
// //         res.status(201).json({ success: true, message: 'Registration successful' });
// //     } catch (error) {
// //         console.error('Registration error:', error);
// //         res.status(500).json({ success: false, message: 'Server error' });
// //     }
// // });

// // app.post('/api/login', async (req, res) => {
// //     try {
// //         const { email, password } = req.body;
// //         const users = loadUsers();
// //         const user = users[email];
// //         if (!user || !(await bcrypt.compare(password, user.password))) {
// //             return res.status(401).json({ success: false, message: 'Invalid credentials' });
// //         }
// //         res.json({ success: true, name: user.name });
// //     } catch (error) {
// //         console.error('Login error:', error);
// //         res.status(500).json({ success: false, message: 'Server error' });
// //     }
// // });

// // // New endpoint to save users to the server's users.json file
// // app.post('/api/save-users', (req, res) => {
// //     try {
// //         const users = req.body;

// //         // Validate that we received user data
// //         if (!users || Object.keys(users).length === 0) {
// //             return res.status(400).json({
// //                 success: false,
// //                 message: 'No user data provided'
// //             });
// //         }

// //         // Save to users.json
// //         saveUsers(users);

// //         res.json({
// //             success: true,
// //             message: 'Users saved successfully to server'
// //         });
// //     } catch (error) {
// //         console.error('Error saving users:', error);
// //         res.status(500).json({
// //             success: false,
// //             message: 'Server error while saving users'
// //         });
// //     }
// // });

// // // New endpoint to retrieve all registered users
// // app.get('/api/users', (req, res) => {
// //     try {
// //         const users = loadUsers();
// //         res.json({ success: true, users });
// //     } catch (error) {
// //         console.error('Error retrieving users:', error);
// //         res.status(500).json({ success: false, message: 'Server error while retrieving users' });
// //     }
// // });

// // // Start server
// // app.listen(PORT, () => {
// //     console.log(`Server running on port ${PORT}`);
// // });

// // server.js - API server for user authentication

// const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const bcrypt = require('bcrypt');
// const path = require('path');

// const app = express();
// const PORT = process.env.PORT || 3000;
// const USERS_FILE = path.join(__dirname, 'database.json'); // New database file

// // Middleware
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));

// // Helper functions
// function loadUsers() {
//     try {
//         if (!fs.existsSync(USERS_FILE)) {
//             fs.writeFileSync(USERS_FILE, JSON.stringify({}, null, 2));
//             return {};
//         }
//         const data = fs.readFileSync(USERS_FILE, 'utf-8');
//         return data ? JSON.parse(data) : {};
//     } catch (error) {
//         console.error('Error loading users:', error);
//         return {};
//     }
// }

// function saveUsers(users) {
//     console.log("Saving users:", JSON.stringify(users, null, 2)); // Debugging
//     fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
// }

// // API Routes
// app.post('/api/register', async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         const users = loadUsers();
//         const hashedPassword = await bcrypt.hash(password, 10);
//         users[email] = { name, password: hashedPassword };
//         saveUsers(users);
//         res.status(201).json({ success: true, message: 'Registration successful' });
//     } catch (error) {
//         console.error('Registration error:', error);
//         res.status(500).json({ success: false, message: 'Server error' });
//     }
// });

// app.post('/api/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const users = loadUsers();
//         const user = users[email];
//         if (!user || !(await bcrypt.compare(password, user.password))) {
//             return res.status(401).json({ success: false, message: 'Invalid credentials' });
//         }
//         res.json({ success: true, name: user.name });
//     } catch (error) {
//         console.error('Login error:', error);
//         res.status(500).json({ success: false, message: 'Server error' });
//     }
// });

// // New endpoint to save users to the server's database.json file
// app.post('/api/save-users', (req, res) => {
//     try {
//         const users = req.body;

//         // Validate that we received user data
//         if (!users || Object.keys(users).length === 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'No user data provided'
//             });
//         }

//         // Save to database.json
//         saveUsers(users);

//         res.json({
//             success: true,
//             message: 'Users saved successfully to server'
//         });
//     } catch (error) {
//         console.error('Error saving users:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Server error while saving users'
//         });
//     }
// });

// // New endpoint to retrieve all registered users
// app.get('/api/users', (req, res) => {
//     try {
//         const users = loadUsers();
//         res.json({ success: true, users });
//     } catch (error) {
//         console.error('Error retrieving users:', error);
//         res.status(500).json({ success: false, message: 'Server error while retrieving users' });
//     }
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
// server.js - API server for user authentication

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const USERS_FILE = path.join(__dirname, 'users.json'); // Users database file

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Helper functions
function loadUsers() {
    try {
        if (!fs.existsSync(USERS_FILE)) {
            return {};
        }
        const data = fs.readFileSync(USERS_FILE, 'utf-8');
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error('Error loading users:', error);
        return {};
    }
}

function saveUsers(users) {
    console.log("Saving users:", JSON.stringify(users, null, 2)); // Debugging
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// API Routes
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let users = loadUsers();

        if (!fs.existsSync(USERS_FILE)) {
            fs.writeFileSync(USERS_FILE, JSON.stringify({}, null, 2));
        }

        if (users[email]) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        users[email] = { name, password: hashedPassword };
        saveUsers(users);
        res.status(201).json({ success: true, message: 'Registration successful' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const users = loadUsers();
        const user = users[email];
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        res.json({ success: true, name: user.name });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// New endpoint to retrieve all registered users
app.get('/api/users', (req, res) => {
    try {
        const users = loadUsers();
        res.json({ success: true, users });
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ success: false, message: 'Server error while retrieving users' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
