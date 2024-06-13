// src/services/apiService.js
import axios from 'axios';
import { getToken, logout } from '@services/authService';

const BASE_URL = 'https://hakhel-c99c0466c9a2.herokuapp.com/hke/api/v1/';

// Create an instance of axios
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept request to include authorization token
api.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Intercept response to handle 401 and 403 status codes
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401 || status === 403) {
        logout();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
