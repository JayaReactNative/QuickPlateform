import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = 'https://quickly-invest-backend-prod-65cxm.ondigitalocean.app/v1'; 

// ------  loginScreen ------
const AuthService = {
  async sendOTP(mobileNumber) {
    try {
      const response = await axios.get(`${BASE_URL}/auth/verify/sendOtp/${mobileNumber}`);
      return response;
    } catch (error) {
      this.handleError(error);
    }
  },


  async VerfyOTP(dataValue) {
    try {
      const response = await axios.post(`${BASE_URL}/auth/verify/verifyOtp`, dataValue); 
      return response; 
    } catch (error) {
      console.error('Verification error:', error);
      throw error;  
    }
  },

  async VerfyPassword(dataValue) {
    try {
      console.log('dataValue<<----',dataValue)
      const response = await axios.post(`${BASE_URL}/auth/verify/verifyPassword`, dataValue); 
      return response; 
    } catch (error) {
      console.error('Verification error:', error);
      throw error;  
    }
  },
  

  

  // Function to sign up a new user
  async signUp(data, userToken){
    try {
      const response = await axios.post(
        `${BASE_URL}/register/basicDetails/add`,
        data,
        {
          headers: {
            'token': `${userToken}`, 
          },
        }
      );
      return response.data; 
    } catch (error) {
      console.error('Sign-up error:', error);
      throw error; 
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

  handleError(error) {
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