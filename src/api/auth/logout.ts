import http from '../../http';

export const logout = () => {
  return http.post<AuthenticatorResponse>('sign-out');
};
