import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { StyledImage, StyledTitle, StyledWrapper } from './styled';
import Box from '@mui/material/Box';
import { Markup } from 'interweave';

const newsItem = {
  title: 'Название Новости',
  content:
    '<div style="height: 100px; width: 100px; background-color: blue"></div>',
  cover: '/static/images/school.jpg',
};

export const NewsItem: FC<any> = () => {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // getBook(id);
    }
  }, []);

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <StyledImage
        alt="Обложка новости"
        src={newsItem.cover}
        width="400"
        height="400"
      />
      <StyledTitle>{newsItem.title}</StyledTitle>
      <StyledWrapper>
        <Markup content={newsItem.content} />
      </StyledWrapper>
    </Box>
  );
};
