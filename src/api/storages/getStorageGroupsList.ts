import http from '../../http';

export const getStorageGroupsList = () => {
  return http.get<AuthenticatorResponse>('storage-groups-list');
};
