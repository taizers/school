import http from '../../http';

export const getCEO = () => {
  return http.get<AuthenticatorResponse>(`users-ceo`);
};
