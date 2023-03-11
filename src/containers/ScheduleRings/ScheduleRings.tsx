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
import { StyledLink, StyledTitle, StyledSubTitle } from './styled';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import schedule from './shedule.json';
import { StyledPageTitle } from '../../styled';

type ScheduleRingsType = {
  user: UserType;
};

export const ScheduleRings: FC<ScheduleRingsType> = ({ user }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <StyledPageTitle>Расписание звонков</StyledPageTitle>
      <Box
        sx={{
          display: 'flex',
          minWidth: '70%',
          gap: '10px',
          alignSelf: 'center',
          justifyContent: 'center',
          '@media screen and (max-width: 800px)': {
            flexWrap: 'wrap',
            maxWidth: '300px',
          },
        }}
      >
        <TableContainer component={Paper} sx={{ minWidth: '300px' }}>
          <StyledSubTitle>1 Смена</StyledSubTitle>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Урок</TableCell>
                <TableCell align="center">Время</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedule?.first?.map((item: any, index) => (
                <TableRow
                  key={`first table ${index}`}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { backgroundColor: '#edeef0' },
                  }}
                >
                  <TableCell align="left">{index}</TableCell>
                  <TableCell align="center">
                    {`${item[0]} - ${item[1]}`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Paper} sx={{ minWidth: '300px' }}>
          <StyledSubTitle>2 Смена</StyledSubTitle>
          <Table aria-label="simple 2 table">
            <TableHead>
              <TableRow>
                <TableCell>Урок</TableCell>
                <TableCell align="center">Время</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedule?.second?.map((item: any, index) => (
                <TableRow
                  key={`second table ${index}`}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { backgroundColor: '#edeef0' },
                  }}
                >
                  <TableCell align="left">{index}</TableCell>
                  <TableCell align="center">
                    {`${item[0]} - ${item[1]}`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
