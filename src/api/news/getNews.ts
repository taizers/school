import http from '../../http';

export const getNews = (id: string) => {
  return http.get<AuthenticatorResponse>(`news/${id}`);
};
