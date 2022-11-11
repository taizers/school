import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { StyledImage, StyledTitle, StyledWrapper } from './styled';
import Box from '@mui/material/Box';
import { Markup } from 'interweave';
import { apiUrl } from '../../constants/constants';

const newsItem = {
  title: 'Название Новости',
  content:
    '<div style="height: 100px; width: 100px; background-color: blue"></div>',
  cover: '/static/images/school.jpg',
};

type NewsItemType = {
  getNews: (id: string) => Promise<any>;
  news: any;
  isLoading: boolean;
}

export const NewsItem: FC<NewsItemType> = ({ getNews, news, isLoading }) => {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getNews(id);
    }
  }, []);

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <StyledImage
        alt="Обложка новости"
        src={`${apiUrl}${news.cover}`}
        width="400"
        height="400"
      />
      <StyledTitle>{news.title}</StyledTitle>
      <StyledWrapper>
        <Markup content={news.content} />
      </StyledWrapper>
    </Box>
  );
};
