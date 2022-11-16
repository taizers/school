import http from '../../http';

export const getPages = () => {
  return http.get<AuthenticatorResponse>('pages');
};
