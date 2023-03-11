import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { StyledImage, StyledTitle, StyledWrapper } from './styled';
import Box from '@mui/material/Box';
import { Markup } from 'interweave';
import { apiUrl } from '../../constants/constants';

type NewsItemType = {
  getNews: (id: string) => Promise<any>;
  news: any;
  isLoading: boolean;
};

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
        src={
          news?.cover ? `${apiUrl}${news.cover}` : '/static/images/no-image.jpg'
        }
        width="400"
        height="400"
      />
      <StyledTitle>{news?.title}</StyledTitle>
      <StyledWrapper>
        {news?.content ? <Markup content={news?.content} /> : 'Нет контента'}
      </StyledWrapper>
    </Box>
  );
};
