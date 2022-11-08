import React, { FC } from 'react';
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

const news = [
  {
    id: 1,
    title: 'Новость 1',
    published: Date.now(),
    cover: '/static/images/school.jpg',
  },
  {
    id: 2,
    title: 'Новость 1',
    published: Date.now(),
    cover: '/static/images/school.jpg',
  },
  {
    id: 3,
    title: 'Новость 1',
    published: Date.now(),
    cover: '/static/images/school.jpg',
  },
  {
    id: 4,
    title: 'Новость 1',
    published: Date.now(),
    cover: '/static/images/school.jpg',
  },
  {
    id: 5,
    title: 'Новость 1',
    published: Date.now(),
    cover: '/static/images/school.jpg',
  },
  {
    id: 6,
    title: 'Новость 1',
    published: Date.now(),
    cover: '/static/images/school.jpg',
  },
  {
    id: 7,
    title: 'Новость 1 fdsfs f dfs dfsd fsdfsdf sdfsdfsdfsd dsf sdf dsf',
    published: Date.now(),
    cover: '/static/images/school.jpg',
  },
];

export const NewsWidget: FC<any> = () => {
  moment().locale('ru');
  return (
    <Box>
      <StyledTitle>Новости</StyledTitle>
      <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '800px' }}>
        {news.map((item, index) => (
          <Box
            key={`news ${item.title} ${index}`}
            sx={{
              display: 'flex',
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
                src={item.cover}
                width="200"
                height="200"
              />
            </Link>
            <Box sx={{ width: '100%' }}>
              <StyledNewsTitle>{item.title}</StyledNewsTitle>
              <StyledDate>{`Опубликовано: ${moment(item.published).format(
                'DD.MM.YY'
              )}`}</StyledDate>
              <StyledNoteLink to={`/news/${item.id}`}>
                Подробнее...
              </StyledNoteLink>
            </Box>
          </Box>
        ))}
        <Button
          sx={{ fontWeigth: 500, alignSelf: 'center' }}
          href="/news"
          variant="contained"
        >
          Все новости
        </Button>
      </Box>
    </Box>
  );
};
