import http from '../../http';

export const getGalery = (id: string) => {
  return http.get<AuthenticatorResponse>(`galeries/${id}`);
};
