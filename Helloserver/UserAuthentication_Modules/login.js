// login.js - Handles user login

const fs = require('fs');
const bcrypt = require('bcrypt');
const USERS_FILE = 'users.json';

function loadUsers() {
    if (!fs.existsSync(USERS_FILE)) return {};
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
}

function loginUser(rl, userMenu, callback) {
    rl.question('Enter your email: ', (email) => {
        rl.question('Enter your password: ', async (password) => {
            const users = loadUsers();
            if (!users[email] || !(await bcrypt.compare(password, users[email].password))) {
                console.log('Invalid credentials!');
                return callback();
            }
            console.log(`Welcome, ${users[email].name}!`);
            userMenu(rl, email, callback);
        });
    });
}

module.exports = { loginUser };
