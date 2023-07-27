import { api } from 'services/api';

export const createPurchase = async (params: any) => {
  try {
    const response = await api.post('/purchase', params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const verifyOTP = async (params: any) => {
  try {
    const response = await api.post('/purchase/verify-otp', params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const resendOTP = async (params: any) => {
  try {
    const response = await api.put('/purchase/resend-otp-code', params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchBuyDetailApi = async (id: any) => {
  try {
    const response = await api.get(`/purchase/buyer/detail/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSellDetailApi = async (id: any) => {
  try {
    const response = await api.get(`/purchase/seller/detail/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const confirmPayApi = async (params: any) => {
  try {
    const response = await api.put('/purchase/buyer-confirm-pay', params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const sellerConfirmApi = async (params: any) => {
  try {
    const response = await api.put('/purchase/seller-confirm-pay', params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getListBuyApi = async (params: any) => {
  try {
    const response = await api.get('/purchase/buy', params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getListSellApi = async (params: any) => {
  try {
    const response = await api.get('/purchase/sell', params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getWalletApi = async (params: any) => {
  try {
    const response = await api.get('/users/wallet', params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getListOnSaleApi = async (params: any) => {
  try {
    const response = await api.get('/put-on-sale', params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const buyerCancelPayApi = async (id: string) => {
  try {
    const response = await api.put(`/purchase/buyer-cancel-pay/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const uploadImageAPI = async (id: string, params?: any) => {
  try {
    const response = await api.postMultiplePart(`/purchase/proof-transferred-image/${id}`, params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateProofAPI = async (params?: any) => {
  try {
    const response = await api.post(`/purchase/proof-transferred-money`, params);
    return response;
  } catch (error) {
    console.log(error);
  }
};
