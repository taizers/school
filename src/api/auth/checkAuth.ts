import axios from 'axios';
import { apiUrl } from '../../constants/constants';

export const checkAuth = () => {
  axios.defaults.withCredentials = true;

  return axios.post(`${apiUrl}/refresh-token`);
};
