import http from '../../http';

export const createStorageFile = (data: any) => {
  return http.post('storage', data);
};
