import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from 'axios';
import { baseURL } from '../config/global-config';
import { getCookie } from '../lib/utils/getCookie';



const csrfCookieName = 'csrftoken';
const csrfHeaderName = 'X-CSRFToken';
const csrfMethods = new Set(['post', 'put', 'patch', 'delete']);

// Base axios instance
const baseApi = axios.create({
  baseURL,
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: csrfCookieName,
  xsrfHeaderName: csrfHeaderName,
});

baseApi.defaults.headers.common['ngrok-skip-browser-warning'] = 'true';

// Request interceptor to add CSRF token to all state-changing requests
baseApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // Ensure credentials + XSRF settings are applied per-request.
  config.withCredentials = true;
  config.withXSRFToken = true;
  config.xsrfCookieName = csrfCookieName;
  config.xsrfHeaderName = csrfHeaderName;

  const method = config.method?.toLowerCase();
  if (!method || !csrfMethods.has(method)) {
    return config;
  }

  const csrfToken =
    typeof document !== 'undefined' ? getCookie(csrfCookieName) : null;
  if (!csrfToken) {
    return config;
  }

  if (config.headers instanceof AxiosHeaders) {
    config.headers.set(csrfHeaderName, csrfToken);
  } else {
    config.headers = config.headers ?? {};
    config.headers[csrfHeaderName] = csrfToken;
  }

  return config;
});


export {
  baseApi
};
