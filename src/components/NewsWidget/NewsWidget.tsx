import React, { FC, useEffect } from 'react';
import {
  StyledTitle,
  StyledImage,
  StyledNewsTitle,
  StyledDate,
  StyledNoteLink,
} from './styled';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { apiUrl } from '../../constants/constants';

type NewsWidgetType = {
  newsWidget: any;
  getNewsWidget: (count: number) => Promise<any>;
};

const countItemsInWidget = 5;

export const NewsWidget: FC<NewsWidgetType> = ({
  getNewsWidget,
  newsWidget,
}) => {
  useEffect(() => {
    getNewsWidget(countItemsInWidget);
  }, []);

  moment().locale('ru');
  return (
    <Box sx={{display: 'flex', flexDirection: 'column',}}>
      <StyledTitle>Новости</StyledTitle>
      <Box sx={{ 
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        justifyContent: 'center',
        '@media screen and (max-width: 800px)': {flexDirection: 'column', maxWidth: '800px', alignItems: 'center'}
      }}>
        {newsWidget &&
          newsWidget.news?.map((item: any, index: number) => (
            <Box
              key={`news ${item.title} ${index}`}
              sx={{
                display: 'flex',
                '@media screen and (max-width: 800px)': {flexDirection: 'column', maxWidth: '400px', alignItems: 'center'},
                gap: '10px',
                mb: '10px',
                p: '5px',
                backgroundColor: '#f0eaea',
                '&:hover': { boxShadow: '0px 0px 6px 0px rgb(0 0 0 / 50%)' },
                '@media screen and (max-width: 600px)': {
                  flexDirection: 'column',
                  alignItems: 'center',
                },
              }}
            >
              <Link to={`/news/${item.id}`}>
                <StyledImage
                  alt="Обложка новости"
                  src={
                    item.cover
                      ? `${apiUrl}${item.cover}`
                      : 'static/images/no-image.jpg'
                  }
                  width="200"
                  height="200"
                />
              </Link>
              <Box sx={{ width: '100%' }}>
                <StyledNewsTitle>{item.title}</StyledNewsTitle>
                <StyledDate>{`Опубликовано: ${moment(item.created_at).format(
                  'DD.MM.YY'
                )}`}</StyledDate>
                <StyledNoteLink to={`/news/${item.id}`}>
                  Подробнее...
                </StyledNoteLink>
              </Box>
            </Box>
          ))}

      </Box>
      <Button
          sx={{ fontWeigth: 500, alignSelf: 'center', mt: 1 }}
          href="/news"
          variant="contained"
      >
          Все новости
      </Button>
    </Box>
  );
};
