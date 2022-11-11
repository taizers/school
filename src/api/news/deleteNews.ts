import http from '../../http';

export const deleteNews = (id: string) => {
  return http.delete<AuthenticatorResponse>(`news/${id}`);
};
