import { baseApi } from '../services/axiosClient';

export type LoginPayload = {
  email: string;
  password: string;
};

export const login = async ({ email, password }: LoginPayload) => {
  const response = await baseApi.post('/auth/login/', { email, password });
  return response.data;
};

export const logout = async () => {
  const response = await baseApi.post('/auth/logout/');
  return response.data;
};
