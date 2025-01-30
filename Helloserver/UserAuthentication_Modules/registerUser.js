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

function registerUser(rl, callback) {
    rl.question('Enter your name: ', (name) => {
        rl.question('Enter your email: ', (email) => {
            const users = loadUsers();
            if (users[email]) {
                console.log('User already exists!');
                return callback();
            }
            rl.question('Enter your password: ', async (password) => {
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
