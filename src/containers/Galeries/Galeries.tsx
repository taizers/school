import React, { FC } from 'react';
import Box from '@mui/material/Box';
import moment from 'moment';
import Pagination from '@mui/material/Pagination';
import CreateGaleryModal from './CreateGaleryModal';
import { StyledTitle, StyledImage, StyledDate, StyledLink } from './styled';

type GaleriesType = {};

const galeries = [
  {
    id: 1,
    title: 'Галерея 1',
    published: Date.now(),
    cover: '/static/images/school.jpg',
  },
  {
    id: 2,
    title: 'Галерея 1',
    published: Date.now(),
    cover: '/static/images/school.jpg',
  },
  {
    id: 3,
    title: 'Галерея 1',
    published: Date.now(),
    cover: '/static/images/school.jpg',
  },
  {
    id: 4,
    title: 'Галерея 1',
    published: Date.now(),
    cover: '/static/images/school.jpg',
  },
  {
    id: 5,
    title: 'Галерея 1',
    published: Date.now(),
    cover: '/static/images/school.jpg',
  },
  {
    id: 6,
    title: 'Галерея 1',
    published: Date.now(),
    cover: '/static/images/school.jpg',
  },
  {
    id: 7,
    title: 'Галерея 1 fdsfs f dfs dfsd fsdfsdf sdfsdfsdfsd dsf sdf dsf',
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

export const Galeries: FC<GaleriesType> = ({}) => {
  moment().locale('ru');
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {true && (
        <Box sx={{ m: '10px' }}>
          <CreateGaleryModal />
        </Box>
      )}
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
        {galeries?.map((item) => (
          <Box
            key={`${item.title} ${item.id}`}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '160px',
              p: '5px',
              mr: '10px',
              '&:hover': {
                boxShadow: '0px 0px 6px 0px rgb(0 0 0 / 50%)',
              },
            }}
          >
            <StyledLink to={`/galeries/${item.id}`}>
              <StyledImage
                src={item.cover}
                alt="Обложка альбома"
                width="150"
                height="150"
              />
              <StyledTitle>{item.title}</StyledTitle>
              <StyledDate>{`Опубликовано: ${moment(item.published).format(
                'DD.MM.YY'
              )}`}</StyledDate>
            </StyledLink>
          </Box>
        ))}
      </Box>
      {galeries && (
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
