import http from '../../http';

export const deleteGalery = (id: string) => {
  return http.delete<AuthenticatorResponse>(`galeries/${id}`);
};
