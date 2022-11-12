import React, { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import moment from 'moment';
import Pagination from '@mui/material/Pagination';
import CreateGaleryModal from './CreateGaleryModal';
import { StyledTitle, StyledImage, StyledDate, StyledLink } from './styled';
import Button from '@mui/material/Button';
import { apiUrl } from '../../constants/constants';
import DeleteModal from '../../components/DeleteModal/index';

type GaleriesType = {
  getAllGaleriesPaginated: (page: number, limit: number) => Promise<any>;
  createGalery: (data: any) => Promise<any>;
  updateGalery: (data: any) => Promise<any>;
  deleteGalery: (id: string) => Promise<any>;
  setGaleriesModalStatus: (data: boolean) => void;
  isLoading: boolean;
  galeries: any;
  isOpen: boolean;
};


export const Galeries: FC<GaleriesType> = ({setGaleriesModalStatus, createGalery, deleteGalery, isOpen, galeries, getAllGaleriesPaginated}) => {
  moment().locale('ru');

  const [page, setPage] = useState(1);
  const [isDelteModalOpen, setDelteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    getAllGaleriesPaginated(page, limit);
  }, []);

  useEffect(() => {
    setPage(galeries?.page);
    setTotalPages(galeries?.totalPages);
  }, [galeries]);

  const onPaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (true) {
      window.scrollTo(0, 0);
      setPage(value);
      getAllGaleriesPaginated(value, limit);
    }
  };

  const onDeleteGalery = () => {
    if (deleteId) {
      deleteGalery(deleteId);
    }
  }

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Box sx={{ m: '10px' }}>
        <Button variant="outlined" onClick={() => setGaleriesModalStatus(true)}>
          Создать альбом
        </Button>
        {isOpen && <CreateGaleryModal isOpen={isOpen} createGalery={createGalery} setGaleriesModalStatus={setGaleriesModalStatus} />}
        {isDelteModalOpen && <DeleteModal isOpen={isDelteModalOpen} item={'галерею'} setModalStatus={setDelteModalOpen} deleteAction={onDeleteGalery} />}
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
        {galeries?.galeries?.map((item: any) => (
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
                src={item.cover ? `${apiUrl}${item.cover}` : 'static/images/no-image.jpg'}
                alt="Обложка альбома"
                width="150"
                height="150"
              />
              <StyledTitle>{item.title}</StyledTitle>
              <StyledDate>{`Опубликовано: ${moment(item.created_at).format(
                'DD.MM.YY'
              )}`}</StyledDate>
            </StyledLink>
            <Button 
              fullWidth
              sx={{m:1}}
              variant="contained"
              onClick={() => {setGaleriesModalStatus(true)}}
            >
              Редактировать
            </Button>
            <Button 
              fullWidth
              sx={{m:1}}
              variant="contained"
              onClick={() => {setDeleteId(item.id); setDelteModalOpen(true)}}
            >
              Удалить
            </Button>
          </Box>
        ))}
      </Box>
      {galeries && (
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
