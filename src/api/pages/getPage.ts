import http from '../../http';

export const getPage = (id: string) => {
  return http.get<AuthenticatorResponse>(`pages/${id}`);
};
