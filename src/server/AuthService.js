// Create a multiple function's which i can use further as a prop in future.
// I want functions for: Login(Mobile Number) (Store token locally), SignUp(firstName, lastName, address, city, state, dateOfBirth, email, password, confirmPassword, referencePassword)
// SendOTP(Mobile Number) (This api will get called at time of login), ForgetPassword(Mobile Number) (With OTP), 
// User proper error handling and industry standard code.
// Language: React-Native
// FileName: AuthService.js


import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = 'https://your-api-url.com'; // Replace with your API base URL

const AuthService = {
  // Function to log in the user
  async login(mobileNumber) {
    try {
      const response = await axios.post(`${BASE_URL}/login`, { mobileNumber });
      const { token } = response.data;

      // Store the token locally
      await AsyncStorage.setItem('userToken', token);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  // Function to sign up a new user
  async signUp({ firstName, lastName, address, city, state, dateOfBirth, email, password, confirmPassword, referencePassword }) {
    try {
      const response = await axios.post(`${BASE_URL}/signup`, {
        firstName,
        lastName,
        address,
        city,
        state,
        dateOfBirth,
        email,
        password,
        confirmPassword,
        referencePassword,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  // Function to send OTP for login
  async sendOTP(mobileNumber) {
    try {
      const response = await axios.post(`${BASE_URL}/send-otp`, { mobileNumber });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  // Function to reset password with OTP
  async forgetPassword(mobileNumber) {
    try {
      const response = await axios.post(`${BASE_URL}/forget-password`, { mobileNumber });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  // Error handling function
  handleError(error) {
    // You can customize the error handling as needed
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || 'Something went wrong';
      throw new Error(message);
    }
    throw new Error('An unexpected error occurred');
  },

  // Function to retrieve the token
  async getToken() {
    try {
      const token = await AsyncStorage.getItem('userToken');
      return token;
    } catch (error) {
      console.error('Failed to retrieve token:', error);
    }
  },

  // Function to log out the user
  async logout() {
    try {
      await AsyncStorage.removeItem('userToken');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  },
};

export default AuthService;




/*
// EXAMPLE USECASE:


import AuthService from './AuthService';

const loginUser = async () => {
  try {
    const response = await AuthService.login('1234567890');
    console.log('Login successful:', response);
  } catch (error) {
    console.error('Login error:', error.message);
  }
};

*/