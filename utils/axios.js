/** @format */

import axios from 'axios';
// config
import { HOST_API } from 'config.js';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: HOST_API,
  // baseURL: 'http://172.16.68.229:8081',
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
