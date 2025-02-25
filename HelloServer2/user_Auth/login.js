// login.js - Handles user login

const fs = require('fs');
const bcrypt = require('bcrypt');
const USERS_FILE = 'users.json';

function loadUsers() {
    if (!fs.existsSync(USERS_FILE)) return {};
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
}

function loginUser(rl, userMenu, callback, attempts = 0) {
    rl.question('Enter your email: ', (email) => {
        rl.question('Enter your password: ', async (password) => {
            const users = loadUsers();
            if (!users[email] || !(await bcrypt.compare(password, users[email].password))) {
                console.log('Invalid credentials!');
                if (attempts < 1) {
                    console.log('Please try again.');
                    return loginUser(rl, userMenu, callback, attempts + 1);
                } else {
                    console.log('Invalid credentials again! Consider registering.');
                    return callback();
                }
            }
            console.log(`Welcome, ${users[email].name}!`);
            userMenu(rl, email, callback);
        });
    });
}

module.exports = { loginUser };

