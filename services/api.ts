import { getI18n } from 'react-i18next';
import { throttle } from 'lodash';
import axios, { AxiosResponse, ResponseType } from 'axios';

import showMessage from 'components/Message';

import validate from 'utils/validate';
import TYPE_CONSTANTS from 'constants/type';
import HTTP_STATUS_CONTSTANTS from 'constants/httpStatus';
import { toast } from 'react-hot-toast';
import Router from 'next/router';

const typeOfMessage = TYPE_CONSTANTS.MESSAGE;
export const ACCESS_TOKEN_KEY = 'accessToken';

const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
} as any;

const HEADERS_MULTIPLE_PART = {
  ...HEADERS,
  'Content-Type': 'multipart/form-data; boundary=something',
  Accept: 'application/json',
};

export const getToken = (token: any) => {
  HEADERS['Authorization'] = `Bearer ${token}`;
  HEADERS_MULTIPLE_PART['Authorization'] = `Bearer ${token}`;
};

const getFullUrl = (url: string) => {
  if (!url.startsWith('/')) {
    url = '/' + url;
  }
  return `${process.env.NEXT_PUBLIC_API_URL}` + url;
};

const resetToLogin = () => {
  const promiseList = [];
  promiseList.push(localStorage.removeItem('persist:root'));
  Router.push('/login');
};

const throttledResetToLogin = throttle(resetToLogin, 500, {
  leading: false,
  trailing: true,
}) as any;

const checkErrorNetwork = (err: any) => {
  if (err?.toJSON() && err.toJSON().message === 'Network Error') {
    return showMessage(typeOfMessage.ERROR, getI18n().t(`message.E11`));
  }
  return err;
};

const checkErrorStatus = (response: AxiosResponse) => {
  if (
    response.status === HTTP_STATUS_CONTSTANTS.BAD_REQUEST ||
    response.status === HTTP_STATUS_CONTSTANTS.SERVER_ERROR ||
    response.status === HTTP_STATUS_CONTSTANTS.UNPROCESSABLE_ENTITY
  ) {
    toast.error(response.data.error || response.data.message);
    return null;
  }
  return response.data;
};

axios.interceptors.request.use(
  function (config) {
    const { headers } = config;
    if (!headers['Authorization']) {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

const api = {
  post: (endpoint: string, params?: any) => {
    return axios
      .post(getFullUrl(endpoint), params, {
        headers: HEADERS,
        validateStatus: (status: any) => validate.validateStatus(status),
      })
      .then(
        (response: any) => {
          if (
            response?.status === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401 ||
            response?.data?.meta?.extraInfo?.status === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401
          ) {
            throttledResetToLogin(endpoint, params, response);
            return response?.data;
          }
          return checkErrorStatus(response);
        },
        (err: any) => {
          return (err?.response?.data && checkErrorStatus(err.response)) || checkErrorNetwork(err);
        },
      )
      .catch((response: any) => {
        return response.data;
      });
  },

  postMultiplePart: (endpoint: string, params?: any) => {
    return axios
      .post(getFullUrl(endpoint), params, {
        headers: HEADERS_MULTIPLE_PART,
        validateStatus: (status: any) => validate.validateStatus(status),
      })
      .then(
        (response: any) => {
          if (
            response?.status === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401 ||
            response?.data?.meta?.extraInfo?.status === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401
          ) {
            throttledResetToLogin(endpoint, params, response);
            return response?.data;
          }
          return checkErrorStatus(response);
        },
        (err: any) => {
          return (err?.response?.data && checkErrorStatus(err.response)) || checkErrorNetwork(err);
        },
      )
      .catch((response: any) => {
        return response.data;
      });
  },

  get: (endpoint: string, params: any = {}) => {
    return axios
      .get(getFullUrl(endpoint), {
        params: params,
        headers: HEADERS,
        validateStatus: (status: any) => validate.validateStatus(status),
      })
      .then(
        (response: any) => {
          if (
            response?.status === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401 ||
            response?.data?.meta?.extraInfo?.status === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401
          ) {
            throttledResetToLogin(endpoint, params, response);
            return checkErrorStatus(response?.data);
          }
          return checkErrorStatus(response);
        },
        (err: any) => {
          return (err?.response?.data && checkErrorStatus(err.response)) || checkErrorNetwork(err);
        },
      )
      .catch((response: any) => {
        return response.data;
      });
  },

  put: (endpoint: string, params?: any) => {
    return axios
      .put(getFullUrl(endpoint), params, {
        headers: HEADERS,
        validateStatus: (status: any) => validate.validateStatus(status),
      })
      .then(
        (response: any) => {
          if (
            response?.status === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401 ||
            response?.data?.meta?.extraInfo?.status === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401
          ) {
            throttledResetToLogin(endpoint, params, response);
            return checkErrorStatus(response?.data);
          }
          return checkErrorStatus(response);
        },
        (err: any) => {
          return (err?.response?.data && checkErrorStatus(err.response)) || checkErrorNetwork(err);
        },
      )
      .catch((response: any) => {
        return response.data;
      });
  },

  patch: (endpoint: string, params?: any) => {
    return axios
      .patch(getFullUrl(endpoint), params, {
        headers: HEADERS,
        validateStatus: (status: any) => validate.validateStatus(status),
      })
      .then(
        (response: any) => {
          if (
            response?.status === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401 ||
            response?.data?.meta?.extraInfo?.status === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401
          ) {
            throttledResetToLogin(endpoint, params, response);
            return checkErrorStatus(response?.data);
          }
          return checkErrorStatus(response);
        },
        (err: any) => {
          return (err?.response?.data && checkErrorStatus(err.response)) || checkErrorNetwork(err);
        },
      )
      .catch((response: any) => {
        return response.data;
      });
  },

  delete: (endpoint: string, params?: any) => {
    return axios
      .delete(getFullUrl(endpoint), {
        params: params,
        headers: HEADERS,
        validateStatus: (status: any) => validate.validateStatus(status),
      })
      .then(
        (response: any) => {
          if (
            response?.status === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401 ||
            response?.data?.meta?.extraInfo?.status === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401
          ) {
            throttledResetToLogin(endpoint, params, response);
            return response?.data;
          }
          return checkErrorStatus(response);
        },
        (err: any) => {
          return (err?.response?.data && checkErrorStatus(err.response)) || checkErrorNetwork(err);
        },
      )
      .catch((response: any) => {
        return response.data;
      });
  },
};

export { api };
