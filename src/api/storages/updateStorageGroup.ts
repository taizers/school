import http from '../../http';
import { UpdateUserType } from '../../constants/tsSchemes';

export const updateStorageGroup = (data: { data: any; id: string }) => {
  const { data: updatedData, id } = data;

  return http.put(`storage-groups/${id}`, updatedData);
};
