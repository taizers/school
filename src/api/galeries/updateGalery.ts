import http from '../../http';
import { UpdateUserType } from '../../constants/tsSchemes';

export const updateGalery = (data: UpdateUserType) => {
  return http.put<AuthenticatorResponse>('galeries', data);
};
