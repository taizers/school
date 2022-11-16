import http from '../../http';

export const getPagesList = () => {
  return http.get<AuthenticatorResponse>('pages-list');
};
