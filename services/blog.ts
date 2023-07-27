import { api } from './api';

export const getListBlogAPI = (params?: any) => {
  return api.get('/post/user', params);
};

export const getDetailBlogAPI = async (id?: any) => {
  const res = await api.get(`/post/detail/user/${id}`);
  return res;
};
