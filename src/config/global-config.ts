// export const baseURL = 'http://localhost:8000';

const useProxy = import.meta.env.PUBLIC_USE_PROXY === 'true';
const rawBaseURL = useProxy
  ? ''
  : (import.meta.env.PUBLIC_BACKEND ?? 'http://localhost:8000');

// Normalize to avoid double slashes when endpoints are called with leading "/".
export const baseURL = rawBaseURL.replace(/\/+$/, '');


export const guestEmail = import.meta.env.PUBLIC_GUEST_EMAIL ?? 'guest@gmail.com';
export const guestPassword = import.meta.env.PUBLIC_GUEST_PASS ?? 'guest-password'