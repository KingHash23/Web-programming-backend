// userDataManager.js - Handles data storage operations
class UserDataManager {
  constructor() {
      this.USERS_KEY = 'users.json';
  }

  // Load users from localStorage (browser) or file system (server)
  loadUsers() {
      if (typeof localStorage !== 'undefined') {
          // Browser environment
          const usersJson = localStorage.getItem(this.USERS_KEY);
          return usersJson ? JSON.parse(usersJson) : {};
      } else {
          // Server environment - would use fs.readFileSync
          return {}; // Placeholder for server implementation
      }
  }

  // Save users to storage
  saveUsers(users) {
      if (typeof localStorage !== 'undefined') {
          // Browser environment
          localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
      } else {
          // Server environment - would use fs.writeFileSync
      }
  }
}

// registerManager.js - Handles user registration
class RegisterManager {
  constructor(userDataManager) {
      this.userDataManager = userDataManager;
  }

  // Validate email format
  validateEmail(email) {
      const emailRegex = /^[a-z0-9@._-]+$/;
      return email.includes('@') && emailRegex.test(email);
  }

  // Validate password requirements
  validatePassword(password) {
      const regex = /^(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      return regex.test(password);
  }

  // Register a new user
  async registerUser(name, email, password) {
      return new Promise((resolve) => {
          setTimeout(() => {
              try {
                  // Normalize email
                  email = email.toLowerCase();
                  
                  // Validate name
                  if (!name.trim()) {
                      return resolve({
                          success: false,
                          message: 'Name is required.'
                      });
                  }
                  
                  // Validate email format
                  if (!this.validateEmail(email)) {
                      return resolve({
                          success: false,
                          message: 'Invalid email! It must contain an @ symbol and only lowercase letters, numbers, and symbols.'
                      });
                  }
                  
                  // Load existing users
                  const users = this.userDataManager.loadUsers();
                  
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
                  this.userDataManager.saveUsers(users);
                  
                  resolve({ 
                      success: true, 
                      message: 'Registration successful!' 
                  });
              } catch (error) {
                  resolve({
                      success: false,
                      message: 'Registration error: ' + error.message
                  });
              }
          }, 1000); // Simulate network delay
      });
  }
}

// loginManager.js - Handles user login
class LoginManager {
  constructor(userDataManager) {
      this.userDataManager = userDataManager;
  }

  // Authenticate user with email and password
  async loginUser(email, password) {
      return new Promise((resolve) => {
          setTimeout(() => {
              try {
                  // Normalize email
                  email = email.toLowerCase();
                  
                  // Load users
                  const users = this.userDataManager.loadUsers();
                  const user = users[email];
                  
                  // Check if user exists
                  if (!user) {
                      return resolve({
                          success: false,
                          message: 'Invalid credentials!'
                      });
                  }
                  
                  // Verify password (plain text for demo, would use bcrypt in real app)
                  if (user.password !== password) {
                      return resolve({
                          success: false,
                          message: 'Invalid credentials!'
                      });
                  }
                  
                  // Return success with user info
                  resolve({
                      success: true,
                      message: 'Login successful',
                      name: user.name,
                      email: email
                  });
              } catch (error) {
                  resolve({
                      success: false,
                      message: 'Login error: ' + error.message
                  });
              }
          }, 1000); // Simulate network delay
      });
  }
}

// accessMenu.js - Handles user menu options
class AccessMenu {
  constructor(userDataManager) {
      this.userDataManager = userDataManager;
  }

  // Get the current user's profile
  getUserProfile(email) {
      const users = this.userDataManager.loadUsers();
      if (users[email]) {
          return {
              success: true,
              name: users[email].name,
              email: email
          };
      }
      return {
          success: false,
          message: 'User not found'
      };
  }

  // Handle logout
  logoutUser() {
      return {
          success: true,
          message: 'Logged out successfully!'
      };
  }
}

// userAuth.js - Main authentication module
class UserAuth {
  constructor() {
      // Initialize components
      this.userDataManager = new UserDataManager();
      this.registerManager = new RegisterManager(this.userDataManager);
      this.loginManager = new LoginManager(this.userDataManager);
      this.accessMenu = new AccessMenu(this.userDataManager);
      
      // Current user state
      this.currentUser = null;
  }
  
  // Register a new user
  async registerUser(name, email, password) {
      return await this.registerManager.registerUser(name, email, password);
  }
  
  // Login user
  async loginUser(email, password) {
      const result = await this.loginManager.loginUser(email, password);
      if (result.success) {
          this.currentUser = {
              email: result.email,
              name: result.name
          };
      }
      return result;
  }
  
  // Get current user
  getCurrentUser() {
      return this.currentUser;
  }
  
  // Get user profile
  getUserProfile(email) {
      return this.accessMenu.getUserProfile(email || (this.currentUser ? this.currentUser.email : null));
  }
  
  // Logout user
  logoutUser() {
      this.currentUser = null;
      return this.accessMenu.logoutUser();
  }
  
  // For testing: load all users
  loadUsers() {
      return this.userDataManager.loadUsers();
  }
}

// Create and export the userAuth instance
const userAuth = new UserAuth();

// Make it available for both module imports and global scope
if (typeof module !== 'undefined' && module.exports) {
  // Node.js environment
  module.exports = { userAuth };
} else {
  // Browser environment
  window.userAuth = userAuth;
}

// Export for ES modules
export { userAuth };