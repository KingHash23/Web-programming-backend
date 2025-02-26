// // // registerUser.js - Handles user registration

// // const fs = require('fs');
// // const bcrypt = require('bcrypt');
// // const USERS_FILE = 'users.json';

// // function loadUsers() {
// //     if (!fs.existsSync(USERS_FILE)) return {};
// //     return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
// // }

// // function saveUsers(users) {
// //     fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
// // }

// // function validatePassword(password) {
// //     const regex = /^(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
// //     return regex.test(password);
// // }

// // function registerUser(rl, callback) {
// //     rl.question('Enter your name: ', (name) => {
// //         rl.question('Enter your email: ', (email) => {
// //             const users = loadUsers();
// //             if (users[email]) {
// //                 console.log('User already exists!');
// //                 return callback();
// //             }
// //             rl.question('Enter your password: ', async (password) => {
// //                 if (!validatePassword(password)) {
// //                     console.log('Password must be at least 8 characters, contain 2 uppercase letters, 2 numbers, and 1 special character.');
// //                     return callback();
// //                 }
// //                 const hashedPassword = await bcrypt.hash(password, 10);
// //                 users[email] = { name, password: hashedPassword };
// //                 saveUsers(users);
// //                 console.log('Registration successful!');
// //                 callback();
// //             });
// //         });
// //     });
// // }

// // module.exports = { registerUser };

// // // registerUser.js - Handles user registration

// // const fs = require('fs');
// // const bcrypt = require('bcrypt');
// // const USERS_FILE = 'users.json';

// // function loadUsers() {
// //     if (!fs.existsSync(USERS_FILE)) return {};
// //     return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
// // }

// // function saveUsers(users) {
// //     fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
// // }

// // function validatePassword(password) {
// //     const regex = /^(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
// //     return regex.test(password);
// // }

// // function validateEmail(email) {
// //     return email.includes('@');
// // }

// // function registerUser(rl, callback) {
// //     rl.question('Enter your name: ', (name) => {
// //         rl.question('Enter your email: ', (email) => {
// //             if (!validateEmail(email)) {
// //                 console.log('Invalid email! It must contain an @ symbol.');
// //                 return callback();
// //             }
// //             let users = loadUsers();
// //             if (users[email]) {
// //                 console.log('Error: Email already registered!');
// //                 return callback();
// //             }
// //             rl.question('Enter your password: ', async (password) => {
// //                 if (!validatePassword(password)) {
// //                     console.log('Password must be at least 8 characters, contain 2 uppercase letters, 2 numbers, and 1 special character.');
// //                     return callback();
// //                 }
// //                 const hashedPassword = await bcrypt.hash(password, 10);
// //                 users[email] = { name, password: hashedPassword };
// //                 saveUsers(users);
// //                 console.log('Registration successful!');
// //                 callback();
// //             });
// //         });
// //     });
// // }

// // module.exports = { registerUser };


// // registerUser.js - Handles user registration

// const fs = require('fs');
// const bcrypt = require('bcrypt');
// const USERS_FILE = 'users.json';

// function loadUsers() {
//     if (!fs.existsSync(USERS_FILE)) return {};
//     return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
// }

// function saveUsers(users) {
//     fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
// }

// function validatePassword(password) {
//     const regex = /^(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
//     return regex.test(password);
// }

// function validateEmail(email) {
//     const emailRegex = /^[a-z@.]+$/;
//     return email.includes('@') && emailRegex.test(email);
// }

// function registerUser(rl, callback) {
//     rl.question('Enter your name: ', (name) => {
//         rl.question('Enter your email: ', (email) => {
//             email = email.toLowerCase();
//             if (!validateEmail(email)) {
//                 console.log('Invalid email! It must contain only lowercase letters, symbols, and an @ symbol.');
//                 return callback();
//             }
//             let users = loadUsers();
//             if (users[email]) {
//                 console.log('Error: Email already registered!');
//                 return callback();
//             }
//             rl.question('Enter your password: ', async (password) => {
//                 if (!validatePassword(password)) {
//                     console.log('Password must be at least 8 characters, contain 2 uppercase letters, 2 numbers, and 1 special character.');
//                     return callback();
//                 }
//                 const hashedPassword = await bcrypt.hash(password, 10);
//                 users[email] = { name, password: hashedPassword };
//                 saveUsers(users);
//                 console.log('Registration successful!');
//                 callback();
//             });
//         });
//     });
// }

// module.exports = { registerUser };
// registerUser.js - Handles user registration as a module

class RegisterManager {
    constructor(userDataManager) {
        this.userDataManager = userDataManager;
    }

    // Validate email format
    validateEmail(email) {
        const emailRegex = /^[a-z0-9@._-]+$/;
        return email.includes('@') && emailRegex.test(email);
    }
    
    // Validate password requirements
    validatePassword(password) {
        // Password must have:
        // - At least 8 characters
        // - At least 2 uppercase letters
        // - At least 2 numbers
        // - At least 1 special character
        const regex = /^(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return regex.test(password);
    }
    
    // Register a new user
    async registerUser(name, email, password) {
        return new Promise((resolve) => {
            setTimeout(async () => {
                try {
                    // Validate input
                    if (!name || !email || !password) {
                        return resolve({ 
                            success: false, 
                            message: 'All fields are required' 
                        });
                    }
                    
                    // Normalize email
                    email = email.toLowerCase();
                    
                    // Validate email format
                    if (!this.validateEmail(email)) {
                        return resolve({ 
                            success: false, 
                            message: 'Invalid email format. Email must contain an @ symbol and valid characters.' 
                        });
                    }
                    
                    // Load users
                    const users = this.userDataManager.loadUsers();
                    
                    // Check if user exists
                    if (users[email]) {
                        return resolve({ 
                            success: false, 
                            message: 'Email already registered' 
                        });
                    }
                    
                    // Validate password
                    if (!this.validatePassword(password)) {
                        return resolve({ 
                            success: false, 
                            message: 'Password must be at least 8 characters, contain 2 uppercase letters, 2 numbers, and 1 special character.' 
                        });
                    }
                    
                    // Hash password if bcrypt is available (server-side)
                    let hashedPassword = password;
                    if (typeof bcrypt !== 'undefined') {
                        hashedPassword = await bcrypt.hash(password, 10);
                    }
                    
                    // Save user
                    users[email] = { 
                        name, 
                        password: hashedPassword 
                    };
                    
                    this.userDataManager.saveUsers(users);
                    
                    resolve({ 
                        success: true, 
                        message: 'Registration successful' 
                    });
                } catch (error) {
                    resolve({
                        success: false,
                        message: 'Registration error: ' + error.message
                    });
                }
            }, 1000); // Simulate network delay
        });
    }
}

export { RegisterManager };