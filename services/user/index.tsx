import { api } from 'services/api';

export const updateAccountInformationApi = async (params: any) => {
  try {
    const response = await api.put('/users/account-information', params);
    return response;
  } catch (error) {
    console.log(error);
  }
};
