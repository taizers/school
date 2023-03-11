import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { AppContainer, MainContent } from '../styled';
import { getToken } from '../../../utils/index';

type PrivateRouteType = {
  component: React.ReactNode;
  isAuth: boolean;
};

export const PrivateRoute: FC<PrivateRouteType> = ({ component, isAuth }) => {
  const token = getToken();

  return (
    <AppContainer>
      {isAuth || token ? component : <Navigate to={'/login'} />}
    </AppContainer>
  );
};
