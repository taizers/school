import React, { FC } from 'react';
import {
  StyledName,
  StyledImage,
  StyledLink,
  StyledPhone,
  StyledPost,
} from './styled';
import { Box } from '@mui/material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { apiUrl } from '../../constants/constants';

type PersonalCardType = {
  human: {
    class_id?: number;
    className?: string;
    username: string;
    avatar?: string;
    phone?: string;
    post?: string;
  };
};

export const PersonalCard: FC<PersonalCardType> = ({ human }) => {
  return (
    <Box>
      <Box></Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 1,
          gap: '15px',
          width: '25%',
          maxWidth: '200px',
          minWidth: '150px',
          maxHeight: '300px',
          border: 'solid #6EC1E4 1px',
          borderRadius: '5px',
          boxShadow: '0px 0px 6px 0px rgb(0 0 0 / 50%)',
        }}
      >
        <StyledImage
          src={
            human?.avatar
              ? `${apiUrl}${human?.avatar}`
              : '/static/images/no-image.jpg'
          }
          alt="Фото"
          width="200"
          height="200"
        />
        {human?.post && <StyledPost>{`${human.post}`}</StyledPost>}
        <StyledName>{human?.username}</StyledName>
        {human?.class_id && (
          <Box sx={{ fontSize: 14 }}>
            Кл. руководитель{' '}
            <StyledLink to={`/class/${human.class_id}`}>
              {human.className}
            </StyledLink>
          </Box>
        )}
        {human?.phone && (
          <StyledPhone>
            <LocalPhoneIcon fontSize="small" sx={{ mr: '5px' }} />
            {human.phone}
          </StyledPhone>
        )}
      </Box>
    </Box>
  );
};
