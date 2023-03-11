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
import {
  StyledSubTitle,
  StyledSecondTitle,
  StyledSecondSubTitle,
  StyledboldText,
  StyledText,
  StyledListItem,
  StyledList,
} from './styled';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import schedule from './shedule.json';
import { StyledPageTitle } from '../../styled';

type ScheduleQuartersAndHolidaysType = {
  user: UserType;
};

export const ScheduleQuartersAndHolidays: FC<
  ScheduleQuartersAndHolidaysType
> = ({ user }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <StyledPageTitle>Расписание четвертей и каникул</StyledPageTitle>
      <Box>
        <TableContainer
          component={Paper}
          sx={{ maxWidth: '600px', m: '0 auto' }}
        >
          <StyledSubTitle>2022 - 2023 учебный год</StyledSubTitle>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#edeef0' }}>
                <TableCell>Четверть</TableCell>
                <TableCell>Начало</TableCell>
                <TableCell>Конец</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedule?.data?.map((item: any, index: any) => (
                <TableRow
                  key={`table ${index}`}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { backgroundColor: '#edeef0' },
                  }}
                >
                  <TableCell align="left">{`${index + 1}-я`}</TableCell>
                  <TableCell align="left">{`${item[0]}`}</TableCell>
                  <TableCell align="left">{`${item[1]}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box>
        <StyledSecondTitle>
          Расписание каникул 2022-2023 учебного года
        </StyledSecondTitle>
        <StyledSecondSubTitle>
          На протяжении учебного года устанавливаются каникулы:
        </StyledSecondSubTitle>
        <StyledList>
          <StyledListItem>
            <StyledText>
              <StyledboldText>осенние</StyledboldText> – 9 дней, с 30 октября по
              7 ноября 2022 г. включительно;
            </StyledText>
          </StyledListItem>
          <StyledListItem>
            <StyledText>
              <StyledboldText>зимние</StyledboldText> – 15 дней, с 25 декабря по
              8 января 2023 г. включительно;
            </StyledText>
          </StyledListItem>
          <StyledListItem>
            <StyledText>
              <StyledboldText>весенние</StyledboldText> – 8 дней, с 26 марта по
              2 апреля 2023 г. включительно;
            </StyledText>
          </StyledListItem>
          <StyledListItem>
            <StyledText>
              <StyledboldText>летние</StyledboldText> – 92 дня, с 1 июня по 31
              августа 2023 г.;
            </StyledText>
            <StyledText>
              для учащихся, завершивших обучение на II ступени общего среднего
              образования, – 81 день, с 12 июня по 31 августа 2023 г.
              включительно.
            </StyledText>
          </StyledListItem>
        </StyledList>
      </Box>
      <StyledText>
        Дополнительные зимние каникулы продолжительностью 7 дней (с 20 по 26
        февраля 2023 года) в ІІІ четверти проводятся для учащихся I-II классов и
        для учащихся ІІІ классов с особенностями психофизического развития с
        пятилетним сроком обучения на I ступени общего среднего образования.
      </StyledText>
    </Box>
  );
};
