import axios from 'axios';

// Use environment variable for flexibility, fallback to localhost for development
const API_URL = 'http://localhost:5000';

// Create an Axios instance for consistent API requests
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} - API response data
 */
export const register = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error.response?.data?.message || "An error occurred");
    throw error;
  }
};

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} image - Image data (if required)
 * @returns {Promise<Object>} - API response data
 */
export const login = async (email, password, image) => {
  try {
    const response = await api.post('/login', { email, password, image });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data?.message || "An error occurred");
    throw error;
  }
};

