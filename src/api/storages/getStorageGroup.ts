import http from '../../http';

export const getStorageGroup = (data: {
  id: string;
  page: number;
  limit: number;
}) => {
  const { id, page, limit } = data;

  return http.get<AuthenticatorResponse>(
    `storage/${id}?page=${page}&limit=${limit}`
  );
};
