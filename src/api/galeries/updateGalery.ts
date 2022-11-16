import http from '../../http';

export const updateGalery = (data: { data: any; id: string }) => {
  const { id, data: updatedData } = data;

  return http.put(`galeries/${id}`, updatedData);
};
