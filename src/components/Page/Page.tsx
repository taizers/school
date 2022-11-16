import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StyledTitle, StyledWrapper } from './styled';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import UpdatePageModal from './UpdatePageModal';
import { Markup } from 'interweave';
import DeleteModal from '../DeleteModal/index';
import DeleteIcon from '@mui/icons-material/Delete';


type PageType = {
  getPage: (id: string) => Promise<any>;
  deletePage: (id: string, history: any) => Promise<any>;
  setUpdatePageModalStatus: (data: boolean) => void;
  updatePage: (data: any, id: string) => Promise<any>;
  getPagesList: () => Promise<any>;
  page: any;
  pagesList: any;
  isLoading: boolean;
  isOpen: boolean;
  isAuth: boolean;
};

export const Page: FC<PageType> = ({ getPage, page, isOpen, isAuth, isLoading, deletePage, setUpdatePageModalStatus, updatePage, getPagesList, pagesList }) => {
  const { id } = useParams();
  const [isDelteModalOpen, setDelteModalOpen] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    if (id) {
      getPage(id);
    }
  }, []);

  useEffect(() => {
    if (id) {
      getPage(id);
    }
  }, [id]);

  const modalAction = (data: any) => {
    if (page?.id) {
      updatePage(data, page.id);
    }
  }

  const onDeleteUser = () => {
    if (page?.id) {
      deletePage(page.id, history);
    }
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {isAuth && <Button
        variant="outlined"
        sx={{ m: 1 }}
        onClick={() => setUpdatePageModalStatus(true)}
      >
        Редактировать страницу
      </Button>}
      <Button
        sx={{ m: 1 }}
        variant="contained"
        onClick={() => {
          setDelteModalOpen(true);
        }}
      >
        <DeleteIcon />
      </Button>
      {isOpen && (
        <UpdatePageModal
          isOpen={isOpen}
          page={page}
          modalAction={modalAction}
          getPagesList={getPagesList}
          pagesList={pagesList}
          setModalStatus={setUpdatePageModalStatus}
        />
      )}
      {isDelteModalOpen && (
        <DeleteModal
          isOpen={isDelteModalOpen}
          item={'Файл'}
          setModalStatus={setDelteModalOpen}
          deleteAction={onDeleteUser}
        />
      )}
      {
          page && <Box
          sx={{ width: '100%' }}
        >
          <StyledTitle>{page.title}</StyledTitle>
          <StyledWrapper>
            {page.content ? <Markup content={page.content} /> : 'Нет контента'}
          </StyledWrapper>
        </Box>
      }
    </Box>

  );
};
