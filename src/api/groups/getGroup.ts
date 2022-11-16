import http from '../../http';

export const getGroup = (id: string) => {
  return http.get<AuthenticatorResponse>(`groups/${id}`);
};
