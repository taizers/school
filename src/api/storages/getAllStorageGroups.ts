import http from '../../http';

export const getAllStorageGroups = (data: { page: number; limit: number }) => {
  const { page, limit } = data;

  return http.get<AuthenticatorResponse>(
    `storage-groups?page=${page}&limit=${limit}`
  );
};
