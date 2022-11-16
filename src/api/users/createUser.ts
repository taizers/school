import http from '../../http';

export const createUser = (data: any) => {
  return http.post<AuthenticatorResponse>('users', data);
};
