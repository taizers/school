import http from '../../http';
import { UpdateUserType } from '../../constants/tsSchemes';

export const updateGalery = (data: any) => {
  return http.put('galeries', data);
};
