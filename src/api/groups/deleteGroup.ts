import http from '../../http';

export const deleteGroup = (id: string) => {
  return http.delete<AuthenticatorResponse>(`groups/${id}`);
};
