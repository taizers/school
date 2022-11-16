import http from '../../http';

export const getGroupsList = () => {
  return http.get<AuthenticatorResponse>('groups-list');
};
