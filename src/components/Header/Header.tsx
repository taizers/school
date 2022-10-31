import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { StyledHeader, StyledSocial } from './styled';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const Header: FC<any> = () => {
  return (
    <StyledHeader>
      <img
        src="/static/images/school.jpg"
        alt="Герб школы"
        width="220"
        height="120"
      />
      <Box sx={{ textAlign: 'center', textTransform: 'uppercase' }}>
        <Typography variant="subtitle1" component="h2">
          Государственное учреждение образования
        </Typography>
        <Typography variant="h5" component="h1">
          "Средняя школа №3 г. Волковыска"
        </Typography>
      </Box>
      <StyledSocial>
        <Link to={'#'}>
          <img src="" alt="" width="20" height="20" />
        </Link>
        <Link to={'#'}>
          <img src="" alt="" width="20" height="20" />
        </Link>
        <Link to={'#'}>
          <img src="" alt="" width="20" height="20" />
        </Link>
      </StyledSocial>
    </StyledHeader>
  );
};
