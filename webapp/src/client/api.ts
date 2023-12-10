import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string || 'http://localhost:3000/api'
})

api.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
