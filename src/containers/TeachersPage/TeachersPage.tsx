import React, { FC } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import MainMenu from '../../components/MainMenu/index';
import SubMenu from '../../components/SubMenu/index';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import HaventAccess from '../../components/HaventAccess';
import HomePage from '../../components/HomePage';
import NotFound from '../../components/NotFound/index';
import PersonalCard from '../../components/PersonalCard/index';
import { StyledGroupName } from './styled';

type TeachersPageType = {};

const groups = [
  {
    title: 'Учителя биологии',
    items: [
      {
        name: 'Василиса',
        lastName: 'Ивановна',
        family: 'Иванова',
        avatar: '/static/images/school.jpg',
        class_id: 1,
        className: '2А класс',
      },
      {
        name: 'Василиса',
        lastName: 'Ивановна',
        family: 'Иванова',
        avatar: '/static/images/school.jpg',
        phone: '8(01512) 3-29-94',
        post: 'Директор школы',
      },
      {
        name: 'Василиса',
        lastName: 'Ивановна',
        family: 'Иванова',
        avatar: '/static/images/school.jpg',
        phone: '8(01512) 3-29-94',
        post: 'Директор школы',
      },
      {
        name: 'Василиса',
        lastName: 'Ивановна',
        family: 'Иванова',
        avatar: '/static/images/school.jpg',
      },
      {
        name: 'Василиса',
        lastName: 'Ивановна',
        family: 'Иванова',
        avatar: '/static/images/school.jpg',
      },
    ],
  },
  {
    title: 'Учителя Химии',
    items: [
      {
        name: 'Василиса',
        lastName: 'Ивановна',
        family: 'Иванова',
        avatar: '/static/images/school.jpg',
        phone: '8(01512) 3-29-94',
        post: 'Директор школы',
      },
      {
        name: 'Василиса',
        lastName: 'Ивановна',
        family: 'Иванова',
        avatar: '/static/images/school.jpg',
        phone: '8(01512) 3-29-94',
        post: 'Директор школы',
      },
      {
        name: 'Василиса',
        lastName: 'Ивановна',
        family: 'Иванова',
        avatar: '/static/images/school.jpg',
        phone: '8(01512) 3-29-94',
        post: 'Директор школы',
      },
      {
        name: 'Василиса',
        lastName: 'Ивановна',
        family: 'Иванова',
        avatar: '/static/images/school.jpg',
      },
      {
        name: 'Василиса',
        lastName: 'Ивановна',
        family: 'Иванова',
        avatar: '/static/images/school.jpg',
      },
      {
        name: 'Василиса',
        lastName: 'Ивановна',
        family: 'Иванова',
        avatar: '/static/images/school.jpg',
      },
      {
        name: 'Василиса',
        lastName: 'Ивановна',
        family: 'Иванова',
        avatar: '/static/images/school.jpg',
      },
      {
        name: 'Василиса',
        lastName: 'Ивановна',
        family: 'Иванова',
        avatar: '/static/images/school.jpg',
      },
      {
        name: 'Василиса',
        lastName: 'Ивановна',
        family: 'Иванова',
        avatar: '/static/images/school.jpg',
      },
      {
        name: 'Василиса',
        lastName: 'Ивановна',
        family: 'Иванова',
        avatar: '/static/images/school.jpg',
      },
      {
        name: 'Василиса',
        lastName: 'Ивановна',
        family: 'Иванова',
        avatar: '/static/images/school.jpg',
      },
      {
        name: 'Василиса',
        lastName: 'Ивановна',
        family: 'Иванова',
        avatar: '/static/images/school.jpg',
      },
    ],
  },
];

export const TeachersPage: FC<TeachersPageType> = ({}) => {
  return (
    <Box>
      {groups?.map((item) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: '0 20px',
          }}
        >
          <StyledGroupName>{item.title}</StyledGroupName>
          <Box
            sx={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {item.items.map((teacher) => (
              <PersonalCard human={teacher} />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};
