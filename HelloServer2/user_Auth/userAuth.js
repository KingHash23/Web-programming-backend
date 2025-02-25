// // userAuth.js - Main script importing authentication modules

// const { registerUser } = require('./registerUser');
// const { loginUser } = require('./login');
// const { userMenu } = require('./accessMenu');
// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// function showMenu() {
//     console.log('\n1. Register');
//     console.log('2. Login');
//     console.log('3. Exit');
//     rl.question('Choose an option: ', (choice) => {
//         if (choice === '1') registerUser(rl, showMenu);
//         else if (choice === '2') loginUser(rl, userMenu, showMenu);
//         else if (choice === '3') rl.close();
//         else {
//             console.log('Invalid choice!');
//             showMenu();
//         }
//     });
// }

// showMenu();

// userAuth.js - Browser-compatible authentication module

class UserAuth {
    constructor() {
      // Initialize storage
      this.USERS_KEY = 'auth_users';
      this.currentUser = null;
    }
  
    // Load users from localStorage
    loadUsers() {
      const usersJson = localStorage.getItem(this.USERS_KEY);
      return usersJson ? JSON.parse(usersJson) : {};
    }
  
    // Save users to localStorage
    saveUsers(users) {
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    }
  
    // Validate email format
    validateEmail(email) {
      const emailRegex = /^[a-z@.]+$/;
      return email.includes('@') && emailRegex.test(email);
    }
  
    // Validate password requirements
    validatePassword(password) {
      const regex = /^(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      return regex.test(password);
    }
  
    // Register a new user
    registerUser(name, email, password) {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Normalize email
          email = email.toLowerCase();
          
          // Validate email format
          if (!this.validateEmail(email)) {
            return resolve({ 
              success: false, 
              message: 'Invalid email! It must contain only lowercase letters, symbols, and an @ symbol.' 
            });
          }
          
          // Load existing users
          const users = this.loadUsers();
          
          // Check if user already exists
          if (users[email]) {
            return resolve({ 
              success: false, 
              message: 'Email already registered!' 
            });
          }
          
          // Validate password
          if (!this.validatePassword(password)) {
            return resolve({ 
              success: false, 
              message: 'Password must be at least 8 characters, contain 2 uppercase letters, 2 numbers, and 1 special character.' 
            });
          }
          
          // In a real app, password would be hashed server-side
          users[email] = { name, password };
          this.saveUsers(users);
          
          resolve({ success: true, message: 'Registration successful!' });
        }, 1000); // Simulate network delay
      });
    }
  
    // Login user
    loginUser(email, password) {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Normalize email
          email = email.toLowerCase();
          
          // Load users
          const users = this.loadUsers();
          const user = users[email];
          
          // Check if user exists and password matches
          if (!user || user.password !== password) {
            return resolve({ 
              success: false, 
              message: 'Invalid credentials!' 
            });
          }
          
          // Set current user
          this.currentUser = {
            email,
            name: user.name
          };
          
          resolve({ 
            success: true, 
            name: user.name 
          });
        }, 1000); // Simulate network delay
      });
    }
  
    // Get current user
    getCurrentUser() {
      return this.currentUser;
    }
  
    // Logout user
    logoutUser() {
      this.currentUser = null;
      return { success: true, message: 'Logged out successfully!' };
    }
  }
  
  // Create a global instance
  const userAuth = new UserAuth();
  
  // Export functions for use in HTML/JS
  export { userAuth };