import React, { FC } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { UserType } from '../../constants/tsSchemes';
import UpdateUserModal from '../UpdateUserModal/index';
import { apiUrl } from '../../constants/constants';

type ProfileType = {
  user: UserType;
};

export const Profile: FC<ProfileType> = ({ user }) => {
  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Личный кабинет
        </Typography>
        <Avatar
          sx={{
            m: 4,
            bgcolor: 'secondary.main',
            border: '#bdc1c7 solid 1px',
            width: 100,
            height: 100,
          }}
        >
          <img
            src={
              user?.avatar
                ? `${apiUrl}${user.avatar}`
                : 'static/images/no-image.jpg'
            }
            alt="Аватар пользователя"
            width="150"
            height="150"
          />
        </Avatar>

        {user && (
          <Box component="form" sx={{ mt: 1 }}>
            <Typography component="h3" variant="h5">
              ID: {user.id}
            </Typography>
            <Typography component="h3" variant="h5">
              Почта: {user.email}
            </Typography>
            <Typography component="h3" variant="h5">
              Имя: {user.username}
            </Typography>
            <Typography component="h3" variant="h5">
              Пост: {user.post}
            </Typography>
            <Typography component="h3" variant="h5">
              Телефон: {user.phone}
            </Typography>
            <Typography component="h3" variant="h5">
              Роль: {user.role}
            </Typography>
            <UpdateUserModal />
          </Box>
        )}
      </Box>
    </Container>
  );
};
