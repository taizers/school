import React, { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import moment from 'moment';
import Pagination from '@mui/material/Pagination';
import CreateGaleryModal from './CreateGaleryModal';
import UpdateGaleryModal from './UpdateGaleryModal';
import { StyledTitle, StyledImage, StyledDate, StyledLink } from './styled';
import Button from '@mui/material/Button';
import { apiUrl } from '../../constants/constants';
import DeleteModal from '../../components/DeleteModal/index';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { StyledPageTitle } from '../../styled';

type GaleriesType = {
  getAllGaleriesPaginated: (page: number, limit: number) => Promise<any>;
  createGalery: (data: any) => Promise<any>;
  updateGalery: (data: any, id: string) => Promise<any>;
  deleteGalery: (id: string) => Promise<any>;
  getGalery: (id: string) => Promise<any>;
  setCreateGaleryModalStatus: (data: boolean) => void;
  setUpdateGaleryModalStatus: (data: boolean) => void;
  isLoading: boolean;
  isAuth: boolean;
  galeries: any;
  galery: any;
  isCreateModalOpen: boolean;
  isUpdateModalOpen: boolean;
};

export const Galeries: FC<GaleriesType> = ({
  setCreateGaleryModalStatus,
  setUpdateGaleryModalStatus,
  updateGalery,
  createGalery,
  deleteGalery,
  getGalery,
  galery,
  isAuth,
  isCreateModalOpen,
  isUpdateModalOpen,
  galeries,
  getAllGaleriesPaginated,
}) => {
  moment().locale('ru');

  const [page, setPage] = useState(1);
  const [isDelteModalOpen, setDelteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [galeryId, setGaleryId] = useState(null);
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
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <StyledPageTitle>Фотоальбом</StyledPageTitle>
      <Box sx={{ m: '10px' }}>
        {isAuth && (
          <Button
            variant="outlined"
            onClick={() => setCreateGaleryModalStatus(true)}
          >
            Создать альбом
          </Button>
        )}
        {isCreateModalOpen && (
          <CreateGaleryModal
            isOpen={isCreateModalOpen}
            createGalery={createGalery}
            setModalStatus={setCreateGaleryModalStatus}
          />
        )}
        {isUpdateModalOpen && (
          <UpdateGaleryModal
            isOpen={isUpdateModalOpen}
            getGalery={getGalery}
            setGaleryId={setGaleryId}
            galeryId={galeryId}
            galery={galery}
            updateGalery={updateGalery}
            setModalStatus={setUpdateGaleryModalStatus}
          />
        )}
        {isDelteModalOpen && (
          <DeleteModal
            isOpen={isDelteModalOpen}
            item={'галерею'}
            setModalStatus={setDelteModalOpen}
            deleteAction={onDeleteGalery}
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
                src={
                  item.cover
                    ? `${apiUrl}${item.cover}`
                    : 'static/images/no-image.jpg'
                }
                alt="Обложка альбома"
                width="150"
                height="150"
              />
              <StyledTitle>{item.title}</StyledTitle>
              <StyledDate>{`Опубликовано: ${moment(item.created_at).format(
                'DD.MM.YY'
              )}`}</StyledDate>
            </StyledLink>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              {isAuth && (
                <Button
                  sx={{ m: 1 }}
                  variant="contained"
                  onClick={() => {
                    setUpdateGaleryModalStatus(true);
                    setGaleryId(item.id);
                  }}
                >
                  <EditIcon />
                </Button>
              )}
              {isAuth && (
                <Button
                  sx={{ m: 1 }}
                  variant="contained"
                  onClick={() => {
                    setDeleteId(item.id);
                    setDelteModalOpen(true);
                  }}
                >
                  <DeleteIcon />
                </Button>
              )}
            </Box>
          </Box>
        ))}
      </Box>
      {!!galeries?.galeries?.length && (
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
