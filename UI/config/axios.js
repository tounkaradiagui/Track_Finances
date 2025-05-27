// src/api/axios.js (ou ./api/axios.js)
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://track-finances.onrender.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Connection: 'keep-alive',
  },
});

export default axiosInstance;
