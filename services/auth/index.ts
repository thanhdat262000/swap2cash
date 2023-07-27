import { api } from 'services/api';

export const registerApi = async (params: any) => {
  try {
    const response = await api.post('/auth/register', params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const verifyOtpCodeApi = async (params: any) => {
  try {
    const response = await api.post('/auth/verify-otp-code', params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const sendOTPChangePass = async (params: any) => {
  try {
    const response = await api.post('/users/change-password-otp');
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const verifyOtpChangePassApi = async (params: any) => {
  try {
    const response = await api.put('/users/verify-otp-code-change-password', params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const loginApi = async (params: any) => {
  try {
    const response = await api.post('/auth/login', params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const resendOTPApi = async (params: any) => {
  try {
    const response = await api.put('/auth/resend-otp-code', params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const forgotPasswordApi = async (params: any) => {
  try {
    const response = await api.post('/auth/forgot-password', params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const verifyOtpCodeForgotPasswordApi = async (params: any) => {
  try {
    const response = await api.post('/auth/verify-otp-code-reset', params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const resendOTPForgotPasswordApi = async (params: any) => {
  try {
    const response = await api.put('/auth/resend-otp-code-reset', params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const resetPasswordApi = async (params: any) => {
  try {
    const response = await api.put('/auth/reset-password', params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getProfileApi = async () => {
  try {
    const response = await api.get('/auth/me');
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getReferralRewardApi = async (params: any) => {
  try {
    const response = await api.get('/users/referral-reward', params);
    return response;
  } catch (error) {
    console.log(error);
  }
};
