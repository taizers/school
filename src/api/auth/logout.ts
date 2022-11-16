import http from '../../http';
import axios from 'axios';
import { apiUrl } from '../../constants/constants';

export const logout = () => {
  axios.defaults.withCredentials = true;

  return axios.post(`${apiUrl}sign-out`);
};
