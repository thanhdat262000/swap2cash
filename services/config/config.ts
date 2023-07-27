import { api } from 'services/api';

export const getStoreConfigApi = async () => {
  console.log('----here----');
  try {
    const response = await api.get('/admin/store-config');
    console.log('response', response);
    return response;
  } catch (error) {
    console.log('error', error);
  }
};
