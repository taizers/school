import http from '../../http';

export const deleteStorageFile = (id: string) => {
  return http.delete<AuthenticatorResponse>(`storage/${id}`);
};
