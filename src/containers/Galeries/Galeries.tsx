import React, { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import moment from 'moment';
import Pagination from '@mui/material/Pagination';
import CreateGaleryModal from './CreateGaleryModal';
import { StyledTitle, StyledImage, StyledDate, StyledLink } from './styled';
import Button from '@mui/material/Button';
import { apiUrl } from '../../constants/constants';

type GaleriesType = {
  getAllGaleriesPaginated: (page: number, limit: number) => Promise<any>;
  createGalery: (data: any) => Promise<any>;
  updateGalery: (data: any) => Promise<any>;
  setGaleriesModalStatus: (data: boolean) => void;
  isLoading: boolean;
  galeries: any;
  isOpen: boolean;
};


export const Galeries: FC<GaleriesType> = ({setGaleriesModalStatus, createGalery, isOpen, galeries, getAllGaleriesPaginated}) => {
  moment().locale('ru');

  const [page, setPage] = useState(1);
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

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {true && (
        <Box sx={{ m: '10px' }}>
          <Button variant="outlined" onClick={() => setGaleriesModalStatus(true)}>
            Создать альбом
          </Button>
          <CreateGaleryModal isOpen={isOpen} createGalery={createGalery} setGaleriesModalStatus={setGaleriesModalStatus} />
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
            <Button variant="outlined" onClick={() => {setGaleriesModalStatus(true)}}>
              Редактировать альбом
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
