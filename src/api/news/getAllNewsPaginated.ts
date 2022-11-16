import http from '../../http';

export const getAllNewsPaginated = (data: { page: number; limit: number }) => {
  const { page, limit } = data;

  return http.get<AuthenticatorResponse>(`news?page=${page}&limit=${limit}`);
};
