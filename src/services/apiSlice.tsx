// src/services/apiClient.ts
import axios, {AxiosInstance} from 'axios';

const baseURL = process.env.BASE_URL;

// Create an Axios instance with a base URL and any default configurations
const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default apiClient;
