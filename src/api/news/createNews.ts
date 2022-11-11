import http from '../../http';
import { UpdateUserType } from '../../constants/tsSchemes';

export const createNews = (data: any) => {
  return http.post<AuthenticatorResponse>('news', data);
};
