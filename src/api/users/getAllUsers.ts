import http from '../../http';

export const getAllUsers = (data: { page: number; limit: number }) => {
  const { page, limit } = data;

  return http.get<AuthenticatorResponse>(`users?page=${page}&limit=${limit}`);
};
