import { api } from 'services/api';

export const createSellOrderApi = async (params: any) => {
  try {
    const response = await api.post('/put-on-sale', params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateSuccessSellOrderApi = async (params: any) => {
  try {
    const response = await api.put('/put-on-sale', params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const rejectSellOrderApi = async (params: any) => {
  try {
    const response = await api.delete(`/put-on-sale/reject/${params.id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getSellOrderApi = async (params?: any) => {
  try {
    const response = await api.get('/put-on-sale', params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAllSellOrderApi = async (params?: any) => {
  try {
    const response = await api.get('/put-on-sale/list-on-sale', params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const cancelPutOnSaleApi = async (id: string, params?: any) => {
  try {
    const response = await api.put(`/put-on-sale/cancel/${id}`, params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateTxPutOnSaleApi = async (id: string, txId: string) => {
  try {
    const response = await api.put(`/put-on-sale/tx-id-cancel`, { id, txId });
    return response;
  } catch (error) {
    console.log(error);
  }
};
