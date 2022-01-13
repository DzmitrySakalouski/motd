import axios from 'axios';
import {API_KEY, BASE_URL} from '../contants';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

const configureAxios = () => {
  axiosInstance.interceptors.response.use(function (resp) {
    if (resp?.data) {
      return resp.data;
    }

    return resp;
  });
};

export default configureAxios;
