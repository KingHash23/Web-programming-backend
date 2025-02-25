// accessMenu.js - Handles user menu options

const fs = require('fs');
const USERS_FILE = 'users.json';

function loadUsers() {
    if (!fs.existsSync(USERS_FILE)) return {};
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
}

function userMenu(rl, email, callback) {
    console.log('\n1. View Profile');
    console.log('2. Logout');
    console.log('3. Exit');
    rl.question('Choose an option: ', (choice) => {
        if (choice === '1') {
            const users = loadUsers();
            console.log(`\nName: ${users[email].name}\nEmail: ${email}\n`);
            userMenu(rl, email, callback);
        } else if (choice === '2') {
            console.log('Logged out successfully!');
            callback();
        } else if (choice === '3') {
            console.log('Goodbye!');
            rl.close();
        } else {
            console.log('Invalid choice!');
            userMenu(rl, email, callback);
        }
    });
}

module.exports = { userMenu };
