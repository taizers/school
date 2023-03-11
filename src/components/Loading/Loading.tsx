import React, { FC } from 'react';
import { StyledFooter, StyledListItem, StyledList } from './styled';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export const Loading: FC<any> = () => {
  return (
    <Box sx={{ backgroundColor: 'gray', display: 'flex', justifyContent: 'center', alignItems: 'center',width: '100vw', height: '100vh' }}>
      <CircularProgress />
    </Box>
  );
};
