import http from '../../http';
import { UpdateUserType } from '../../constants/tsSchemes';

export const createGroup = (data: any) => {
  return http.post<AuthenticatorResponse>('groups', data);
};
