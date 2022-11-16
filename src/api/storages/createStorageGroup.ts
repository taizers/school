import http from '../../http';
import { UpdateUserType } from '../../constants/tsSchemes';

export const createStorageGroup = (data: any) => {
  return http.post<AuthenticatorResponse>('storage-groups', data);
};
