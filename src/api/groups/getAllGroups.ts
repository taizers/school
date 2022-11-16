import http from '../../http';

export const getAllGroups = () => {
  return http.get<AuthenticatorResponse>('groups');
};
