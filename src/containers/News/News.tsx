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
import DeleteModal from '../../components/DeleteModal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

type NewsType = {
  getAllNewsPaginated: (page: number, limit: number) => Promise<any>;
  createNews: (data: any) => Promise<any>;
  updateNews: (data: any, id: string) => Promise<any>;
  deleteNews: (id: string) => Promise<any>;
  getNews: (id: string) => Promise<any>;
  setNewsModalStatus: (data: boolean) => void;
  isLoading: boolean;
  allNews: any;
  news: any;
  isOpen: boolean;
};

export const News: FC<NewsType> = ({
  isLoading,
  allNews,
  deleteNews,
  getNews,
  getAllNewsPaginated,
  createNews,
  updateNews,
  setNewsModalStatus,
  isOpen,
  news,
}) => {
  moment().locale('ru');
  const [page, setPage] = useState(1);
  const [newsId, setNewsId] = useState(null);
  const [isDeleteModalOpen, setDeleteModalStatus] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    getAllNewsPaginated(page, limit);
  }, []);

  useEffect(() => {
    if (allNews) {
      setPage(allNews.page);
      setTotalPages(allNews.totalPages);
    }
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

  const modalAction = (data: any) => {
    if (news) {
      updateNews(data, news.id);
    } else {
      createNews(data);
    }
  };

  const onDelete = () => {
    if (deleteId) {
      deleteNews(deleteId);
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
        {isDeleteModalOpen && (
          <DeleteModal
            item={'новость'}
            isOpen={isDeleteModalOpen}
            deleteAction={onDelete}
            setModalStatus={setDeleteModalStatus}
          />
        )}
        {isOpen && (
          <CreateNewsModal
            modalAction={modalAction}
            isOpen={isOpen}
            news={news}
            getNews={getNews}
            setNewsId={setNewsId}
            newsId={newsId}
            setModalStatus={setNewsModalStatus}
          />
        )}
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
        {allNews?.news?.map((item: any) => (
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
                src={
                  item.cover
                    ? `${apiUrl}${item.cover}`
                    : 'static/images/no-image.jpg'
                }
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
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Button
                variant="contained"
                sx={{ m: 1 }}
                onClick={() => {
                  setNewsModalStatus(true);
                  setNewsId(item.id);
                }}
              >
                <EditIcon />
              </Button>
              <Button
                sx={{ m: 1 }}
                variant="contained"
                onClick={() => {
                  setDeleteModalStatus(true);
                  setDeleteId(item.id);
                }}
              >
                <DeleteIcon />
              </Button>
            </Box>
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
