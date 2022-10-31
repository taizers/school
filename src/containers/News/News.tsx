import React, { FC } from 'react';
import Box from '@mui/material/Box';
import moment from 'moment';
import Pagination from '@mui/material/Pagination';
import {
  StyledTitle,
  StyledImage,
  StyledDate,
  StyledLink,
  StyledNoteLink,
} from './styled';

type NewsType = {};

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

const onPaginationChange = (
  event: React.ChangeEvent<unknown>,
  value: number
) => {
  if (true) {
    window.scrollTo(0, 0);
    // setPage(value - 1);
    // getBooks(query, value - 1);
  }
};

export const News: FC<NewsType> = ({}) => {
  moment().locale('ru');

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          width: '100%',
          rowGap: '10px',
          mr: '-10px',
        }}
      >
        {news?.map((item) => (
          <Box
            key={`${item.title} ${item.id}`}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '160px',
              p: '5px',
              mr: '10px',
              '&:hover': {
                boxShadow: '0px 0px 6px 0px rgb(0 0 0 / 50%)',
              },
            }}
          >
            <StyledLink to={`/news/${item.id}`}>
              <StyledImage
                src={item.cover}
                alt="Обложка альбома"
                width="150"
                height="150"
              />
            </StyledLink>
            <StyledTitle>{item.title}</StyledTitle>
            <StyledDate>{`Опубликовано: ${moment(item.published).format(
              'DD.MM.YY'
            )}`}</StyledDate>
            <StyledNoteLink to={`/news/${item.id}`}>
              Подробнее...
            </StyledNoteLink>
          </Box>
        ))}
      </Box>
      {news && (
        <Pagination
          count={1}
          sx={{ mt: '10px' }}
          color="primary"
          defaultPage={1}
          boundaryCount={2}
          page={1}
          onChange={onPaginationChange}
        />
      )}
    </Box>
  );
};
