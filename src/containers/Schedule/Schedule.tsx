import React, { FC } from 'react';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { UserType } from '../../constants/tsSchemes';
import UpdateUserModal from '../UpdateUserModal/index';
import { apiUrl } from '../../constants/constants';
import { StyledLink } from './styled';
import { StyledPageTitle } from '../../styled';

type ScheduleType = {
  user: UserType;
};

export const Schedule: FC<ScheduleType> = ({ user }) => {
  return (
    <Box>
      <StyledPageTitle>Расписание</StyledPageTitle>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <StyledLink to={'rings'}>Расписание звонков</StyledLink>
        <StyledLink to={'quarters-and-holidays'}>
          Расписание четвертей и каникул
        </StyledLink>
        <StyledLink to={'classes'}>Расписание классов</StyledLink>
      </Box>
    </Box>
  );
};
