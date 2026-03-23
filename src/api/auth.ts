import { baseApi } from '../services/axiosClient';

export type LoginPayload = {
  email: string;
  password: string;
};

export const login = async ({ email, password }: LoginPayload) => {
  const response = await baseApi.post('/auth/login/', { email, password });
  return response.data;
};




/* Get CSFRT TOKEN and Logout **/
let csrfTokenCache: string | null = null;

async function getCsrfToken() {
  if (csrfTokenCache) return csrfTokenCache;
  const { data } = await baseApi.get('/auth/csrf/');
  csrfTokenCache = data.csrfToken;
  return csrfTokenCache;
}

export const logout = async () => {
  const token = await getCsrfToken();
  const response = await baseApi.post(
    '/auth/logout/',
    null,
    { headers: { 'X-CSRFToken': token } }
  );
  return response.data;
};


export const validateUser = async (): Promise<boolean> => {
  try { // temporary working authentication need api
    await baseApi.get('/api/inventory/inventory_metrics/')
    return true; // this line is read if user is validated
  } catch {
    return false; // else exis it entirely 
  }
}