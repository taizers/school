import http from '../../http';

export const getAdministartionGroup = () => {
  return http.get('administration-group');
};
