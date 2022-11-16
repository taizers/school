import http from '../../http';
import { UpdateUserType } from '../../constants/tsSchemes';

export const updateUser = (data: { data: UpdateUserType; id: string }) => {
  const { data: updatedData, id } = data;

  return http.put<any>(`users/${id}`, updatedData);
};
