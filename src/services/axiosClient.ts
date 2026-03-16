import axios from 'axios';
import { baseURL } from '../config/global-config';

// Base axios instance
const baseApi = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get CSRF Token
function getCSRFToken() {
  const match = document.cookie.match(/csrftoken=([\w-]+)/);
  return match ? match[1] : null;
}

// Request interceptor to add CSRF token to all state-changing requests
baseApi.interceptors.request.use((config: any) => {
  const csrfToken = getCSRFToken();
  if (csrfToken && ['post', 'put', 'patch', 'delete'].includes(config.method)) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  return config;
});


export {
  baseApi
};
