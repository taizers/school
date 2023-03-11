import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { AppContainer, MainContent } from '../styled';
import { getToken } from '../../../utils/index';

type PrivateAdminRouteType = {
  component: React.ReactNode;
  isAuth: boolean;
  role: string;
};

export const PrivateAdminRoute: FC<PrivateAdminRouteType> = ({
  component,
  isAuth,
  role,
}) => {
  const token = getToken();

  return (
    <AppContainer>
      {isAuth && token && role === 'admin' ? component : <Navigate to={'/'} />}
    </AppContainer>
  );
};
