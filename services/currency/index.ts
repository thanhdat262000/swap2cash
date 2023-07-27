import { api } from 'services/api';

export const getCurrencyApi = async (params?: any) => {
  try {
    const response = await api.get('/currency', params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrencyFiatApi = async (params?: any) => {
  try {
    const response = await api.get('/currency/fiat', params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getNationalitiesApi = async () => {
  try {
    const response = await api.get('/lookup-table/nationalities');
    return response;
  } catch (error) {
    console.log(error);
  }
};
