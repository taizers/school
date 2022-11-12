import axios from 'axios';
import { apiUrl } from '../../constants/constants';

type ValueType = {
  email: string;
  password: string;
};

export const login = (data: ValueType) => {
  axios.defaults.withCredentials = true;

  return axios.post(`${apiUrl}/sign-in`, data);
};
