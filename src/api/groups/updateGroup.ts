import http from '../../http';
import { UpdateUserType } from '../../constants/tsSchemes';

export const updateGroup = (data: { data: any; id: string }) => {
  const { data: updatedData, id } = data;

  return http.put(`groups/${id}`, updatedData);
};
