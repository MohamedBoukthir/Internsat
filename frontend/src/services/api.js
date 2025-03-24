import axios from 'axios';

const API_URL = 'http://localhost:5000';  // Flask backend URL

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error.response?.data || error.message);
    throw error;
  }
};

export const login = async (email, password, image) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
      image,
    });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};