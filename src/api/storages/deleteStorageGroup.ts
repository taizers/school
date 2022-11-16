import http from '../../http';

export const deleteStorageGroup = (id: string) => {
  return http.delete<AuthenticatorResponse>(`storage-groups/${id}`);
};
