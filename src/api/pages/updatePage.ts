import http from '../../http';
import { UpdateUserType } from '../../constants/tsSchemes';

export const updatePage = (data: { data: any; id: string }) => {
  const { data: updatedData, id } = data;

  return http.put(`pages/${id}`, updatedData);
};
