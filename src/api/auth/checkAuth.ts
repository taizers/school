import http from '../../http';

export const checkAuth = () => {
  return http.post<AuthenticatorResponse>(`/refresh-token`);
};
