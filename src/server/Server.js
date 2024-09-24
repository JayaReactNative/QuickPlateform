import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = 'https://quickly-invest-backend-prod-65cxm.ondigitalocean.app/v1';

const Server = {
  // --------- token and userId
  async getToken() {
    try {
      const token = await AsyncStorage.getItem('userToken');
      return token;
    } catch (error) {
      console.error('Failed to retrieve token:', error);
    }
  },
  async getUserId() {
    try {
      const token = await AsyncStorage.getItem('authId');
      return token;
    } catch (error) {
      console.error('Failed to retrieve token:', error);
    }
  },

  // ------ user detail -----
  async getUserDetail() {
    let token = await this.getToken();
    let userId = await this.getUserId();
    try {
      
      const response = await axios.get(`${BASE_URL}/register/basicDetails/${userId}`, {
        headers: {
          'token': `${token}`,
        },
      });
      console.log("User Response", response.data);
      return response;
    } catch (error) {
      this.handleError(error);
    }
  },

  // ------ reward list -----
  async getRewardList() {
    let token = await this.getToken();
    let userId = await this.getUserId();
    try {
      const response = await axios.get(`${BASE_URL}/reward/getReward/${userId}`, {
        headers: {
          'token': `${token}`,
        },
      });
      return response;
    } catch (error) {
      this.handleError(error);
    }
  },

  async getTotalIvest() {
    let token = await this.getToken();
    let userId = await this.getUserId();
    try {
      const response = await axios.get(`${BASE_URL}/portfolio/portfolioDetails/totalInvestment/${userId}`, {
        headers: {
          'token': `${token}`,
        },
      });
      return response;
    } catch (error) {
      this.handleError(error);
    }
  },

  async getProfitBalance() {
    let token = await this.getToken();
    let userId = await this.getUserId();
    try {
      const response = await axios.get(`${BASE_URL}/wallet/walletDetails/totalBalance/${userId}`, {
        headers: {
          'token': `${token}`,
        },
      });
      return response;
    } catch (error) {
      this.handleError(error);
    }
  },

  async getWalletBalance() {
    let token = await this.getToken();
    let userId = await this.getUserId();
    try {
      const response = await axios.get(`${BASE_URL}/userWallet/userWallets/${userId}`, {
        headers: {
          'token': `${token}`,
        },
      });
      return response;
    } catch (error) {
      this.handleError(error);
    }
  },

  //   ----- Get number details
  async getSimName(data) {
    let token = await this.getToken();
    try {
      const response = await axios.post(`${BASE_URL}/recharge/mobile/getOperatorDetails`, data, {
        headers: {
          'token': `${token}`,
        },
      });
      return response;
    } catch (error) {
      this.handleError(error);
    }
  },

  //   ----- Get number details
  async getOperators() {
    let token = await this.getToken();
    try {
      const response = await axios.get(`${BASE_URL}/operator/getCode/8`, {
        headers: {
          'token': `${token}`,
        },
      });
      return response;
    } catch (error) {
      this.handleError(error);
    }
  },

  //   ----- Get number details
  async getRechargeList(data) {
    let token = await this.getToken();
    try {
      const response = await axios.post(`${BASE_URL}/recharge/mobile/getPlans`, data, {
        headers: {
          'token': `${token}`,
        },
      });
      return response;
    } catch (error) {
      this.handleError(error);
    }
  },

  //   ----- Get number details
  async getCurrentDTHeList(currentPlanData) {
    let token = await this.getToken();
    try {
      const response = await axios.post(`${BASE_URL}/recharge/dth/dthRecharge/dthRechargePlans`, currentPlanData, {
        headers: {
          'token': `${token}`,
        },
      });
      return response;
    } catch (error) {
      this.handleError(error);
    }
  },


  //   ----- Get Interest withdrawel details
  async getWithDrawList() {
    let token = await this.getToken();
    let userId = await this.getUserId();
    try {
      const response = await axios.get(`${BASE_URL}/withdrawal/withdrawalDetails/${userId}`, {
        headers: {
          'token': `${token}`,
        },
      });
      return response;
    } catch (error) {
      this.handleError(error);
    }
  },

  // ----- capitalWithdraw
  async getCapitalDrawList() {
    let token = await this.getToken();
    let userId = await this.getUserId();
    try {
      const response = await axios.get(`${BASE_URL}/capitalWithdrawal/getCapitalWithdrawRequest/${userId}`, {
        headers: {
          'token': `${token}`,
        },
      });
      return response;
    } catch (error) {
      this.handleError(error);
    }
  },

  // ----- Investment
  async getInvestmentList() {
    let token = await this.getToken();
    let userId = await this.getUserId();
    console.log(`======>>>>>> authId: ${userId}, token: ${token}`);
    try {
      const response = await axios.get(`${BASE_URL}/portfolio/portfolioDetails/list/${userId}`, {
        headers: {
          'token': `${token}`,
        },
      });
      return response;
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


}
export default Server