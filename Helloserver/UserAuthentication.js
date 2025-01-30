const fs = require('fs');
const readline = require('readline');

// Password encryption is implemented using bcrypt, fulfilling the assignment requirement.
const bcrypt = require('bcrypt');

// This file stores user credentials as per assignment requirements.
const USERS_FILE = 'users.json';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function loadUsers() {
    if (!fs.existsSync(USERS_FILE)) return {};
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
}

function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// This function handles user registration, saving credentials to a JSON file.
function registerUser() {
    rl.question('Enter your name: ', (name) => {
        rl.question('Enter your email: ', (email) => {
            const users = loadUsers();
            if (users[email]) {
                console.log('User already exists!');
                return showMenu();
            }
            rl.question('Enter your password: ', async (password) => {
                const hashedPassword = await bcrypt.hash(password, 10);
                users[email] = { name, password: hashedPassword };
                saveUsers(users);
                console.log('Registration successful!');
                showMenu();
            });
        });
    });
}

// This function verifies login credentials as per the assignment instructions.
function loginUser() {
    rl.question('Enter your email: ', (email) => {
        rl.question('Enter your password: ', async (password) => {
            const users = loadUsers();
            if (!users[email] || !(await bcrypt.compare(password, users[email].password))) {
                console.log('Invalid credentials!');
                return showMenu();
            }
            console.log(`Welcome, ${users[email].name}!`);
            userMenu(email);
        });
    });
}

// This function implements the post-login menu, listing options like viewing the profile and logging out.
function userMenu(email) {
    console.log('\n1. View Profile');
    console.log('2. Logout');
    console.log('3. Exit');
    rl.question('Choose an option: ', (choice) => {
        if (choice === '1') {
            const users = loadUsers();
            console.log(`\nName: ${users[email].name}\nEmail: ${email}\n`);
            userMenu(email);
        } else if (choice === '2') {
            console.log('Logged out successfully!');
            showMenu();
        } else if (choice === '3') {
            console.log('Goodbye!');
            rl.close();
        } else {
            console.log('Invalid choice!');
            userMenu(email);
        }
    });
}

function showMenu() {
    console.log('\n1. Register');
    console.log('2. Login');
    console.log('3. Exit');
    rl.question('Choose an option: ', (choice) => {
        if (choice === '1') registerUser();
        else if (choice === '2') loginUser();
        else if (choice === '3') rl.close();
        else {
            console.log('Invalid choice!');
            showMenu();
        }
    });
}

showMenu();
