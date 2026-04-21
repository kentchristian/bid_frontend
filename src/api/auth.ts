import { getCookie } from '../lib/utils/getCookie';
import { baseApi } from '../services/axiosClient';

export type LoginPayload = {
  email: string;
  password: string;
};

export const login = async ({ email, password }: LoginPayload) => {
  const response = await baseApi.post('/auth/login/', { email, password });
  return response.data;
};




/* Get CSRF TOKEN and Logout **/
const csrfCookieName = 'csrftoken';

export async function getCsrfToken(forceRefresh = false) {
  if (!forceRefresh) {
    const existingToken =
      typeof document !== 'undefined' ? getCookie(csrfCookieName) : null;
    if (existingToken) {
      return existingToken;
    }
  }

  const { data } = await baseApi.get('/auth/csrf/');

  const refreshedToken =
    typeof document !== 'undefined' ? getCookie(csrfCookieName) : null;
  return refreshedToken ?? data?.csrfToken ?? null;
}

export const logout = async () => {
  try {
    const token = await getCsrfToken();
    const response = await baseApi.post(
      '/auth/logout/',
      null,
      token ? { headers: { 'X-CSRFToken': token } } : undefined,
    );
    return response.data;
  } catch (error) {
    const status = (error as { response?: { status?: number } }).response
      ?.status;
    if (status === 403) {
      const token = await getCsrfToken(true);
      const response = await baseApi.post(
        '/auth/logout/',
        null,
        token ? { headers: { 'X-CSRFToken': token } } : undefined,
      );
      return response.data;
    }
    throw error;
  }
};


export const validateUser = async (): Promise<boolean> => {
  try { // temporary working authentication need api
    await baseApi.get('/api/inventory/inventory_metrics/')
    return true; // this line is read if user is validated
  } catch {
    return false; // else exis it entirely 
  }
}
