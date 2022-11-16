import http from '../../http';
import { UpdateUserType } from '../../constants/tsSchemes';

export const updateNews = (data: { data: any; id: string }) => {
  const { data: updatedData, id } = data;

  return http.put(`news/${id}`, updatedData);
};
