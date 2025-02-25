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

// function registerUser(rl, callback) {
//     rl.question('Enter your name: ', (name) => {
//         rl.question('Enter your email: ', (email) => {
//             const users = loadUsers();
//             if (users[email]) {
//                 console.log('User already exists!');
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
//     return email.includes('@');
// }

// function registerUser(rl, callback) {
//     rl.question('Enter your name: ', (name) => {
//         rl.question('Enter your email: ', (email) => {
//             if (!validateEmail(email)) {
//                 console.log('Invalid email! It must contain an @ symbol.');
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


// registerUser.js - Handles user registration

const fs = require('fs');
const bcrypt = require('bcrypt');
const USERS_FILE = 'users.json';

function loadUsers() {
    if (!fs.existsSync(USERS_FILE)) return {};
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
}

function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function validatePassword(password) {
    const regex = /^(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
}

function validateEmail(email) {
    const emailRegex = /^[a-z@.]+$/;
    return email.includes('@') && emailRegex.test(email);
}

function registerUser(rl, callback) {
    rl.question('Enter your name: ', (name) => {
        rl.question('Enter your email: ', (email) => {
            email = email.toLowerCase();
            if (!validateEmail(email)) {
                console.log('Invalid email! It must contain only lowercase letters, symbols, and an @ symbol.');
                return callback();
            }
            let users = loadUsers();
            if (users[email]) {
                console.log('Error: Email already registered!');
                return callback();
            }
            rl.question('Enter your password: ', async (password) => {
                if (!validatePassword(password)) {
                    console.log('Password must be at least 8 characters, contain 2 uppercase letters, 2 numbers, and 1 special character.');
                    return callback();
                }
                const hashedPassword = await bcrypt.hash(password, 10);
                users[email] = { name, password: hashedPassword };
                saveUsers(users);
                console.log('Registration successful!');
                callback();
            });
        });
    });
}

module.exports = { registerUser };
