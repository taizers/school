import http from '../../http';
import { UpdateUserType } from '../../constants/tsSchemes';

export const createPage = (data: any) => {
  return http.post<AuthenticatorResponse>('pages', data);
};
