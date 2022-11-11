import http from '../../http';
import { UpdateUserType } from '../../constants/tsSchemes';

export const updateUser = (data: UpdateUserType) => {
  return http.put<any>('users', data);
};
