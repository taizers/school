import http from '../../http';
import { UpdateUserType } from '../../constants/tsSchemes';

export const createGalery = (data: any) => {
  return http.post<AuthenticatorResponse>('galeries', data);
};
