import React from 'react';
import { Box } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { isArray } from 'lodash';
import { StyledValue } from './styled';
import PersonalCard from '../PersonalCard/index';
import NewsWidget from '../../components/NewsWidget/index';

const tableInfo = [
  {
    title: 'Официальное наименование:',
    value:
      'Государственное учреждение образования "Средняя школа № 3 г. Волковыска"',
  },
  {
    title: 'Тип учреждения:',
    value:
      'Учреждение общего среднего образования / Установа агульнай сярэдняй адукацыi',
  },
  {
    title: 'Населенный пункт:',
    value: 'Волковыск',
  },
  {
    title: 'Адрес:',
    value: '231900 г. Волковыск, Советская, 15',
  },
  {
    title: 'Телефоны:',
    value: [
      '8(01512) 2-00-76 (Учительская)',
      '8(01512) 9-43-80 (Приёмная)',
      '8(01512) 2-00-75 (Заместители директора)',
      '8(01512) 2-00-77 (СППС)',
      '8(01512) 3-29-94 (Кабинет психолога)',
    ],
  },
  {
    title: 'E-mail:',
    value: 'sh3volkovysk@uovrik.by',
  },
];

const human = {
  name: 'Василиса',
  lastName: 'Ивановна',
  family: 'Иванова',
  avatar: '/static/images/school.jpg',
  phone: '8(01512) 3-29-94',
  post: 'Директор школы',
};

const getColumnValues = (arr: Array<string>) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }} >
      {arr.map((item, index) => (
        <StyledValue key={`${item} ${index}`}>{item}</StyledValue>
      ))}
    </Box>
  );
};

export const HomePage = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          '@media screen and (max-width: 600px)': {
            flexDirection: 'column',
            alignItems: 'center',
          },
        }}
      >
        <TableContainer sx={{ backgroundColor: '#f1eded' }} component={Paper}>
          <Table aria-label="info table">
            <TableBody>
              {tableInfo.map((row, index) => (
                <TableRow
                  key={`${row.title} ${index}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell
                    sx={{ width: 'max-content', p: '8px', fontWeight: 550 }}
                    component="th"
                    scope="column"
                    key={`${row.title} ${index} cell 1`}
                  >
                    {row.title}
                  </TableCell>
                  <TableCell sx={{ p: '8px' }} key={`${row.title} ${index} cell 2`}>
                    {isArray(row.value)
                      ? getColumnValues(row.value)
                      : row.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <PersonalCard human={human} />
      </Box>
      <Box sx={{ width: '100%' }}>
        <NewsWidget />
      </Box>
    </Box>
  );
};
