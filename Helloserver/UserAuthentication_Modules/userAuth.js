// userAuth.js - Main script importing authentication modules

const { registerUser } = require('./registerUser');
const { loginUser } = require('./login');
const { userMenu } = require('./accessMenu');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu() {
    console.log('\n1. Register');
    console.log('2. Login');
    console.log('3. Exit');
    rl.question('Choose an option: ', (choice) => {
        if (choice === '1') registerUser(rl, showMenu);
        else if (choice === '2') loginUser(rl, userMenu, showMenu);
        else if (choice === '3') rl.close();
        else {
            console.log('Invalid choice!');
            showMenu();
        }
    });
}

showMenu();
