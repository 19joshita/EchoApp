// src/services/apiClient.ts
import axios, {AxiosInstance} from 'axios';

const baseURL = 'http://192.168.29.111:8000/api/v1';

// Create an Axios instance with a base URL and any default configurations
const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  //   timeout: 10000, // Set a timeout for API requests (e.g., 10 seconds)
});

export default apiClient;
