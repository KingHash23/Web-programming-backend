// // Updated userAuth.js with login attempt limiting and modified dashboard

// document.addEventListener('DOMContentLoaded', () => {
//     // DOM elements
//     const screens = {
//         mainMenu: document.getElementById('main-menu'),
//         register: document.getElementById('register-screen'),
//         login: document.getElementById('login-screen'),
//         dashboard: document.getElementById('user-dashboard'),
//         profile: document.getElementById('user-profile-screen')
//     };

//     // Track login attempts
//     let loginAttempts = 0;

//     // Navigation buttons
//     document.getElementById('register-btn').addEventListener('click', () => showScreen('register'));
//     document.getElementById('login-btn').addEventListener('click', () => {
//         loginAttempts = 0; // Reset attempts when navigating to login screen
//         showScreen('login');
//     });
//     document.getElementById('back-to-menu-from-register').addEventListener('click', () => showScreen('mainMenu'));
//     document.getElementById('back-to-menu-from-login').addEventListener('click', () => showScreen('mainMenu'));
//     document.getElementById('logout-btn').addEventListener('click', logout);
//     document.getElementById('view-profile-btn').addEventListener('click', () => showScreen('profile'));
//     document.getElementById('back-to-dashboard-btn').addEventListener('click', () => showScreen('dashboard'));

//     // Form submission
//     document.getElementById('submit-register').addEventListener('click', registerUser);
//     document.getElementById('submit-login').addEventListener('click', loginUser);

//     // Check if user is already logged in
//     const loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
//     if (loggedInUser) {
//         displayUserProfile(loggedInUser);
//         showScreen('dashboard');
//     }

//     // Functions
//     function showScreen(screenName) {
//         // Hide all screens
//         Object.values(screens).forEach(screen => {
//             screen.classList.remove('active');
//         });
        
//         // Show the requested screen
//         screens[screenName].classList.add('active');
//     }

//     // Validation functions
//     function validateEmail(email) {
//         // Check if email starts with lowercase letter
//         if (!/^[a-z]/.test(email)) {
//             return { valid: false, message: 'Email must start with a lowercase letter' };
//         }
        
//         // Check if email contains @ symbol
//         if (!email.includes('@')) {
//             return { valid: false, message: 'Email must contain an @ symbol' };
//         }
        
//         return { valid: true };
//     }

//     function validatePassword(password) {
//         // Check for at least 2 uppercase letters
//         const uppercaseCount = (password.match(/[A-Z]/g) || []).length;
//         if (uppercaseCount < 2) {
//             return { valid: false, message: 'Password must contain at least 2 uppercase letters' };
//         }
        
//         // Check for at least 2 numbers
//         const numbersCount = (password.match(/[0-9]/g) || []).length;
//         if (numbersCount < 2) {
//             return { valid: false, message: 'Password must contain at least 2 numbers' };
//         }
        
//         // Check for at least 1 symbol
//         if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
//             return { valid: false, message: 'Password must contain at least 1 special character' };
//         }
        
//         return { valid: true };
//     }

//     async function registerUser() {
//         const name = document.getElementById('register-name').value.trim();
//         const email = document.getElementById('register-email').value.trim();
//         const password = document.getElementById('register-password').value;
//         const messageElement = document.getElementById('register-message');
        
//         // Basic validation
//         if (!name || !email || !password) {
//             messageElement.textContent = 'All fields are required';
//             messageElement.className = 'error';
//             return;
//         }
        
//         // Validate email
//         const emailValidation = validateEmail(email);
//         if (!emailValidation.valid) {
//             messageElement.textContent = emailValidation.message;
//             messageElement.className = 'error';
//             return;
//         }
        
//         // Validate password
//         const passwordValidation = validatePassword(password);
//         if (!passwordValidation.valid) {
//             messageElement.textContent = passwordValidation.message;
//             messageElement.className = 'error';
//             return;
//         }
        
//         try {
//             const response = await fetch('http://localhost:3000/api/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ name, email, password })
//             });
            
//             const data = await response.json();
            
//             if (response.ok) {
//                 messageElement.textContent = data.message;
//                 messageElement.className = 'success';
                
//                 // Clear form fields
//                 document.getElementById('register-name').value = '';
//                 document.getElementById('register-email').value = '';
//                 document.getElementById('register-password').value = '';
                
//                 // Redirect to login after a short delay
//                 setTimeout(() => {
//                     showScreen('login');
//                 }, 1500);
//             } else {
//                 messageElement.textContent = data.message;
//                 messageElement.className = 'error';
//             }
//         } catch (error) {
//             messageElement.textContent = 'Connection error. Please try again.';
//             messageElement.className = 'error';
//             console.error('Registration error:', error);
//         }
//     }

//     async function loginUser() {
//         const email = document.getElementById('login-email').value.trim();
//         const password = document.getElementById('login-password').value;
//         const messageElement = document.getElementById('login-message');
        
//         // Basic validation
//         if (!email || !password) {
//             messageElement.textContent = 'Email and password are required';
//             messageElement.className = 'error';
//             return;
//         }
        
//         try {
//             const response = await fetch('http://localhost:3000/api/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ email, password })
//             });
            
//             const data = await response.json();
            
//             if (response.ok) {
//                 // Reset login attempts on successful login
//                 loginAttempts = 0;
                
//                 messageElement.textContent = data.message;
//                 messageElement.className = 'success';
                
//                 // Store user info in local storage
//                 localStorage.setItem('currentUser', JSON.stringify(data.user));
                
//                 // Display user profile
//                 displayUserProfile(data.user);
                
//                 // Clear form fields
//                 document.getElementById('login-email').value = '';
//                 document.getElementById('login-password').value = '';
                
//                 // Redirect to dashboard after a short delay
//                 setTimeout(() => {
//                     showScreen('dashboard');
//                 }, 1000);
//             } else {
//                 // Increment failed login attempts
//                 loginAttempts++;
                
//                 if (loginAttempts >= 3) {
//                     // After 3 failed attempts, suggest registration
//                     messageElement.innerHTML = 'Too many failed attempts. <a href="#" id="suggest-register">Register a new account?</a>';
//                     messageElement.className = 'error';
                    
//                     // Add click event for the registration suggestion
//                     document.getElementById('suggest-register').addEventListener('click', (e) => {
//                         e.preventDefault();
//                         loginAttempts = 0; // Reset counter
//                         showScreen('register');
//                     });
//                 } else {
//                     // Regular error for attempts 1-2
//                     messageElement.textContent = `Invalid credentials! Attempt ${loginAttempts} of 3.`;
//                     messageElement.className = 'error';
//                 }
//             }
//         } catch (error) {
//             messageElement.textContent = 'Connection error. Please try again.';
//             messageElement.className = 'error';
//             console.error('Login error:', error);
//         }
//     }

//     function displayUserProfile(user) {
//         document.getElementById('profile-name').textContent = user.name;
//         document.getElementById('profile-email').textContent = user.email;
//     }

//     function logout() {
//         // Clear user data from local storage
//         localStorage.removeItem('currentUser');
        
//         // Redirect to main menu
//         showScreen('mainMenu');
//     }
// });
// Updated userAuth.js with modular imports for login and registration

import { setupLogin } from './login.js';
import { setupRegister } from './register.js';

document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const screens = {
        mainMenu: document.getElementById('main-menu'),
        register: document.getElementById('register-screen'),
        login: document.getElementById('login-screen'),
        dashboard: document.getElementById('user-dashboard'),
        profile: document.getElementById('user-profile-screen')
    };

    // Core utility functions
    function showScreen(screenName) {
        // Hide all screens
        Object.values(screens).forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show the requested screen
        screens[screenName].classList.add('active');
    }

    function displayUserProfile(user) {
        document.getElementById('profile-name').textContent = user.name;
        document.getElementById('profile-email').textContent = user.email;
    }

    function logout() {
        // Clear user data from local storage
        localStorage.removeItem('currentUser');
        
        // Redirect to main menu
        showScreen('mainMenu');
    }

    // Initialize login and registration modules
    const { loginUser, resetLoginAttempts } = setupLogin({
        showScreen,
        displayUserProfile
    });
    
    const { registerUser } = setupRegister({
        showScreen
    });

    // Navigation buttons
    document.getElementById('register-btn').addEventListener('click', () => showScreen('register'));
    document.getElementById('login-btn').addEventListener('click', () => {
        resetLoginAttempts(); // Reset attempts when navigating to login screen
        showScreen('login');
    });
    document.getElementById('back-to-menu-from-register').addEventListener('click', () => showScreen('mainMenu'));
    document.getElementById('back-to-menu-from-login').addEventListener('click', () => showScreen('mainMenu'));
    document.getElementById('logout-btn').addEventListener('click', logout);
    document.getElementById('view-profile-btn').addEventListener('click', () => showScreen('profile'));
    document.getElementById('back-to-dashboard-btn').addEventListener('click', () => showScreen('dashboard'));

    // Form submission
    document.getElementById('submit-register').addEventListener('click', registerUser);
    document.getElementById('submit-login').addEventListener('click', loginUser);

    // Check if user is already logged in
    const loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
    if (loggedInUser) {
        displayUserProfile(loggedInUser);
        showScreen('dashboard');
    }
});