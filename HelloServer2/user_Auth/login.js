// // login.js - Handles user login

// const fs = require('fs');
// const bcrypt = require('bcrypt');
// const USERS_FILE = 'users.json';

// function loadUsers() {
//     if (!fs.existsSync(USERS_FILE)) return {};
//     return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
// }

// function loginUser(rl, userMenu, callback, attempts = 0) {
//     rl.question('Enter your email: ', (email) => {
//         rl.question('Enter your password: ', async (password) => {
//             const users = loadUsers();
//             if (!users[email] || !(await bcrypt.compare(password, users[email].password))) {
//                 console.log('Invalid credentials!');
//                 if (attempts < 1) {
//                     console.log('Please try again.');
//                     return loginUser(rl, userMenu, callback, attempts + 1);
//                 } else {
//                     console.log('Invalid credentials again! Consider registering.');
//                     return callback();
//                 }
//             }
//             console.log(`Welcome, ${users[email].name}!`);
//             userMenu(rl, email, callback);
//         });
//     });
// }

// module.exports = { loginUser };

// login.js - Handles user login as a module

class LoginManager {
    constructor(userDataManager) {
        this.userDataManager = userDataManager;
    }

    // Authenticate user with email and password
    async loginUser(email, password) {
        return new Promise((resolve) => {
            setTimeout(async () => {
                try {
                    // Normalize email
                    email = email.toLowerCase();
                    
                    // Load users
                    const users = this.userDataManager.loadUsers();
                    const user = users[email];
                    
                    // Check if user exists
                    if (!user) {
                        return resolve({ 
                            success: false, 
                            message: 'Invalid credentials!' 
                        });
                    }
                    
                    // Verify password (use bcrypt in server environment)
                    let isPasswordValid;
                    
                    if (typeof bcrypt !== 'undefined') {
                        // Server-side with bcrypt
                        isPasswordValid = await bcrypt.compare(password, user.password);
                    } else {
                        // Client-side direct comparison (for demo only)
                        isPasswordValid = (user.password === password);
                    }
                    
                    if (!isPasswordValid) {
                        return resolve({ 
                            success: false, 
                            message: 'Invalid credentials!' 
                        });
                    }
                    
                    // Return success with user info
                    resolve({ 
                        success: true, 
                        message: 'Login successful',
                        name: user.name,
                        email: email
                    });
                } catch (error) {
                    resolve({
                        success: false,
                        message: 'Login error: ' + error.message
                    });
                }
            }, 1000); // Simulate network delay
        });
    }
}

export { LoginManager };