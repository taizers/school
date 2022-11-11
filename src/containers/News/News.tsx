import React, { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import moment from 'moment';
import Pagination from '@mui/material/Pagination';
import CreateNewsModal from './CreateNewsModal/index';
import Button from '@mui/material/Button';
import {
  StyledTitle,
  StyledImage,
  StyledDate,
  StyledLink,
  StyledNoteLink,
} from './styled';
import { apiUrl } from '../../constants/constants';

type NewsType = {
  getAllNewsPaginated: (page: number, limit: number) => Promise<any>;
  createNews: (data: any) => Promise<any>;
  updateNews: (data: any) => Promise<any>;
  setNewsModalStatus: (data: boolean) => void;
  isLoading: boolean;
  allNews: any;
  isOpen: boolean;
};

export const News: FC<NewsType> = ({ isLoading, allNews, getAllNewsPaginated, createNews, updateNews, setNewsModalStatus, isOpen }) => {
  moment().locale('ru');
  const [page, setPage] = useState(1);
  const [news, setNews] = useState();
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    getAllNewsPaginated(page, limit);
  }, []);

  useEffect(() => {
    setPage(allNews.page);
    setTotalPages(allNews.totalPages);
  }, [allNews]);

  const onPaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (true) {
      window.scrollTo(0, 0);
      getAllNewsPaginated(value, limit);
    }
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Box>
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => setNewsModalStatus(true)}
        > 
          {'Создать новость'}
        </Button>
        {isOpen && <CreateNewsModal modalAction={news ? updateNews : createNews} isOpen={isOpen} news={news} setNews={setNews} setModalStatus={setNewsModalStatus}  />}
      </Box>
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
        {allNews?.news?.map((item:any) => (
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
                src={item.cover ? `${apiUrl}${item.cover}` : 'static/images/no-image.jpg'}
                alt="Обложка альбома"
                width="150"
                height="150"
              />
            </StyledLink>
            <StyledTitle>{item.title}</StyledTitle>
            <StyledDate>{`Опубликовано: ${moment(item.created_at).format(
              'DD.MM.YY'
            )}`}</StyledDate>
            <StyledNoteLink to={`/news/${item.id}`}>
              Подробнее...
            </StyledNoteLink>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {setNewsModalStatus(true); setNews(item)}}
            > 
              {'Редактировать новость'}
            </Button>
            {/* <CreateNewsModal modalAction={createNews}  news={item} /> */}
          </Box>
        ))}
      </Box>
      {allNews && (
        <Pagination
          count={totalPages || 1}
          sx={{ mt: '10px' }}
          color="primary"
          defaultPage={1}
          boundaryCount={2}
          page={page || 1}
          onChange={onPaginationChange}
        />
      )}
    </Box>
  );
};
