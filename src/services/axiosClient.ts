import axios from 'axios';
import { baseURL } from '../config/global-config';



const csrfCookieName = 'csrftoken';
const csrfHeaderName = 'X-CSRFToken';

// Base axios instance
const baseApi = axios.create({
  baseURL,
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: csrfCookieName,
  xsrfHeaderName: csrfHeaderName,
});

baseApi.defaults.headers.common['ngrok-skip-browser-warning'] = 'true';



export {
  baseApi
};
