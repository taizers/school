import http from '../../http';

export const getAllGaleriesPaginated = (data: {
  page: number;
  limit: number;
}) => {
  const { page, limit } = data;

  return http.get<AuthenticatorResponse>(
    `galeries?page=${page}&limit=${limit}`
  );
};
