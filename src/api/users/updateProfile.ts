import http from '../../http';
import { UpdateUserType } from '../../constants/tsSchemes';

export const updateProfile = (data: UpdateUserType) => {
  return http.put<any>('users', data);
};
