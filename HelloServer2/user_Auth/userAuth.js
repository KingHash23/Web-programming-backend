// // // userAuth.js - Main script importing authentication modules

// // const { registerUser } = require('./registerUser');
// // const { loginUser } = require('./login');
// // const { userMenu } = require('./accessMenu');
// // const readline = require('readline');

// // const rl = readline.createInterface({
// //     input: process.stdin,
// //     output: process.stdout
// // });

// // function showMenu() {
// //     console.log('\n1. Register');
// //     console.log('2. Login');
// //     console.log('3. Exit');
// //     rl.question('Choose an option: ', (choice) => {
// //         if (choice === '1') registerUser(rl, showMenu);
// //         else if (choice === '2') loginUser(rl, userMenu, showMenu);
// //         else if (choice === '3') rl.close();
// //         else {
// //             console.log('Invalid choice!');
// //             showMenu();
// //         }
// //     });
// // }

// // showMenu();

// // userAuth.js - Browser-compatible authentication module

// class UserAuth {
//     constructor() {
//       // Initialize storage
//       this.USERS_KEY = 'auth_users';
//       this.currentUser = null;
//     }
  
//     // Load users from localStorage
//     loadUsers() {
//       const usersJson = localStorage.getItem(this.USERS_KEY);
//       return usersJson ? JSON.parse(usersJson) : {};
//     }
  
//     // Save users to localStorage
//     saveUsers(users) {
//       localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
//     }
  
//     // Validate email format
//     validateEmail(email) {
//       const emailRegex = /^[a-z@.]+$/;
//       return email.includes('@') && emailRegex.test(email);
//     }
  
//     // Validate password requirements
//     validatePassword(password) {
//       const regex = /^(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
//       return regex.test(password);
//     }
  
//     // Register a new user
//     registerUser(name, email, password) {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           // Normalize email
//           email = email.toLowerCase();
          
//           // Validate email format
//           if (!this.validateEmail(email)) {
//             return resolve({ 
//               success: false, 
//               message: 'Invalid email! It must contain only lowercase letters, symbols, and an @ symbol.' 
//             });
//           }
          
//           // Load existing users
//           const users = this.loadUsers();
          
//           // Check if user already exists
//           if (users[email]) {
//             return resolve({ 
//               success: false, 
//               message: 'Email already registered!' 
//             });
//           }
          
//           // Validate password
//           if (!this.validatePassword(password)) {
//             return resolve({ 
//               success: false, 
//               message: 'Password must be at least 8 characters, contain 2 uppercase letters, 2 numbers, and 1 special character.' 
//             });
//           }
          
//           // In a real app, password would be hashed server-side
//           users[email] = { name, password };
//           this.saveUsers(users);
          
//           resolve({ success: true, message: 'Registration successful!' });
//         }, 1000); // Simulate network delay
//       });
//     }
  
//     // Login user
//     loginUser(email, password) {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           // Normalize email
//           email = email.toLowerCase();
          
//           // Load users
//           const users = this.loadUsers();
//           const user = users[email];
          
//           // Check if user exists and password matches
//           if (!user || user.password !== password) {
//             return resolve({ 
//               success: false, 
//               message: 'Invalid credentials!' 
//             });
//           }
          
//           // Set current user
//           this.currentUser = {
//             email,
//             name: user.name
//           };
          
//           resolve({ 
//             success: true, 
//             name: user.name 
//           });
//         }, 1000); // Simulate network delay
//       });
//     }
  
//     // Get current user
//     getCurrentUser() {
//       return this.currentUser;
//     }
  
//     // Logout user
//     logoutUser() {
//       this.currentUser = null;
//       return { success: true, message: 'Logged out successfully!' };
//     }
//   }
  
//   // Create a global instance
//   const userAuth = new UserAuth();
  
//   // Export functions for use in HTML/JS
//   export { userAuth };
// userAuth.js - Main authentication module integrating all components

// import { RegisterManager } from './registerUser.js';
// import { LoginManager } from './login.js';
// import { AccessMenu } from './accessMenu.js';

// class UserDataManager {
//     constructor() {
//         // Set storage keys
//         this.USERS_KEY = 'auth_users';
//     }
    
//     // Load users from storage
//     loadUsers() {
//         // In browser environment
//         if (typeof localStorage !== 'undefined') {
//             const usersJson = localStorage.getItem(this.USERS_KEY);
//             return usersJson ? JSON.parse(usersJson) : {};
//         } 
//         // In Node.js environment
//         else if (typeof fs !== 'undefined') {
//             const USERS_FILE = 'users.json';
//             if (!fs.existsSync(USERS_FILE)) return {};
//             return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
//         }
        
//         return {};
//     }
    
//     // Save users to storage
//     saveUsers(users) {
//         // In browser environment
//         if (typeof localStorage !== 'undefined') {
//             localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
//         } 
//         // In Node.js environment
//         else if (typeof fs !== 'undefined') {
//             const USERS_FILE = 'users.json';
//             fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
//         }
//     }
// }

// class UserAuth {
//     constructor() {
//         // Initialize data manager
//         this.userDataManager = new UserDataManager();
        
//         // Initialize modules
//         this.registerManager = new RegisterManager(this.userDataManager);
//         this.loginManager = new LoginManager(this.userDataManager);
//         this.accessMenu = new AccessMenu(this.userDataManager);
        
//         // Track current user
//         this.currentUser = null;
//     }
    
//     // Register a new user
//     async registerUser(name, email, password) {
//         const result = await this.registerManager.registerUser(name, email, password);
//         return result;
//     }
    
//     // Login user
//     async loginUser(email, password) {
//         const result = await this.loginManager.loginUser(email, password);
        
//         if (result.success) {
//             // Set current user on successful login
//             this.currentUser = {
//                 email: email,
//                 name: result.name
//             };
//         }
        
//         return result;
//     }
    
//     // Get current user info
//     getCurrentUser() {
//         return this.currentUser;
//     }
    
//     // Get user profile
//     getUserProfile(email) {
//         return this.accessMenu.getUserProfile(email || (this.currentUser ? this.currentUser.email : null));
//     }
    
//     // Logout user
//     logoutUser() {
//         const result = this.accessMenu.logoutUser();
//         this.currentUser = null;
//         return result;
//     }
// }

// // Create a global instance
// const userAuth = new UserAuth();

// // Export for use in HTML/JS
// export { userAuth };
// userAuth.js - Client-side module for user authentication




import { RegisterManager } from './registerUser.js';
import { LoginManager } from './login.js';
import { AccessMenu } from './accessMenu.js';

// User data manager for browser storage
class UserDataManager {
    constructor() {
        this.currentUser = null;
    }

    loadUsers() {
        const data = localStorage.getItem('auth_users');
        return data ? JSON.parse(data) : {};
    }

    saveUsers(users) {
        localStorage.setItem('auth_users', JSON.stringify(users));
        
        // Additionally, send the data to the server to save in users.json
        fetch('/api/save-users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(users)
        })
        .catch(error => console.error('Error saving users to server:', error));
    }
    
    setCurrentUser(user) {
        this.currentUser = user;
    }
    
    getCurrentUser() {
        return this.currentUser;
    }
}

// Create instances
const userDataManager = new UserDataManager();
const registerManager = new RegisterManager(userDataManager);
const loginManager = new LoginManager(userDataManager);
const accessMenu = new AccessMenu(userDataManager);

// Main authentication object
const userAuth = {
    // Register a new user
    async registerUser(name, email, password) {
        const result = await registerManager.registerUser(name, email, password);
        
        // If server API is available, also register through the server
        try {
            const serverResponse = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });
            
            // If the server registration fails but client succeeds, we'll still return success
            // but log the server error
            if (!serverResponse.ok) {
                console.warn('Server registration failed, but client registration succeeded');
            }
        } catch (error) {
            console.warn('Could not connect to server, using local storage only:', error);
        }
        
        return result;
    },
    
    // Login a user
    async loginUser(email, password) {
        const result = await loginManager.loginUser(email, password);
        
        if (result.success) {
            userDataManager.setCurrentUser({
                name: result.name,
                email: email
            });
        }
        
        return result;
    },
    
    // Get user profile
    getUserProfile(email) {
        return accessMenu.getUserProfile(email);
    },
    
    // Get current logged in user
    getCurrentUser() {
        return userDataManager.getCurrentUser();
    },
    
    // Logout user
    logoutUser() {
        userDataManager.setCurrentUser(null);
        return accessMenu.logoutUser();
    }
};

export { userAuth };