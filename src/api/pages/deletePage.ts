import http from '../../http';

export const deletePage = (id: string) => {
  return http.delete<AuthenticatorResponse>(`pages/${id}`);
};
