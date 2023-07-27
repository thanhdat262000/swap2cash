import { api } from 'services/api';

export const createPaymentApi = async (params: any) => {
  try {
    const response = await api.post('/payment', params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getListPaymentApi = async (params?: any) => {
  try {
    const response = await api.get('/payment', params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const editPaymentApi = async (params: any) => {
  try {
    const response = await api.put('/payment', params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deletePaymentApi = async (params: any) => {
  try {
    const response = await api.delete(`/payment/${params.id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const withdrawTokenApi = async (params: any) => {
  try {
    const response = await api.post(`/users/withdraw`, params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateTxWithdrawApi = async (id: string, txId: string) => {
  try {
    const response = await api.put(`/users/txId-withdraw`, { id, txId });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const withdrawReferralApi = async (params: any) => {
  try {
    const response = await api.post(`/users/withdraw-referral-reward`, params);
    return response;
  } catch (error) {
    console.log(error);
  }
};
