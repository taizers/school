import http from '../../http';
import { UpdateUserType } from '../../constants/tsSchemes';

export const updateNews = (data: UpdateUserType) => {
  return http.put<AuthenticatorResponse>('news', data);
};
