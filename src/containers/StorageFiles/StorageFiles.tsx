import React, { FC, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteModal from '../../components/DeleteModal/index';
import StorageGroupModal from './StorageGroupModal/index';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import DotMenu from '../../components/DotMenu/index';
import { UsersType } from '../../constants/tsSchemes';
import { apiUrl } from '../../constants/constants';
import { formatBytes } from '../../utils/convert';
import { StyledPageTitle } from '../../styled';

type StorageFilesTypes = {
  setStorageGroupsModalStatus: (data: boolean) => void;
  isLoading: boolean;
  group: any;
  isOpen: boolean;
  deleteStorageFile: (id: string, groupId: string) => Promise<any>;
  createStorageFile: (data: any, id: string) => Promise<any>;
  getStorageGroup: (id: string, page: number, limit: number) => Promise<any>;
};

export const StorageFiles: FC<StorageFilesTypes> = ({
  getStorageGroup,
  setStorageGroupsModalStatus,
  isLoading,
  group,
  isOpen,
  deleteStorageFile,
  createStorageFile,
}) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isDelteModalOpen, setDelteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<any>(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getStorageGroup(id, page, limit);
    }
  }, []);

  useEffect(() => {
    if (group?.files) {
      setPage(group.files.page);
      setTotalPages(group.files.totalPages);
    }
  }, [group]);

  const onShowMoreClick = (id: string) => {};

  const onDeleteUser = () => {
    if (deleteId) {
      deleteStorageFile(deleteId, group.id);
    }
  };

  const onPaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (true) {
      if (id) {
        window.scrollTo(0, 0);
        setPage(value);
        getStorageGroup(id, value, limit);
      }
    }
  };

  const modalAction = (data: any) => {
    data.append('group_id', group.id);
    createStorageFile(data, group.id);
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <StyledPageTitle>Файлы</StyledPageTitle>
      <Button
        variant="contained"
        sx={{ m: 1 }}
        onClick={() => setStorageGroupsModalStatus(true)}
      >
        {'Создать Файл'}
      </Button>
      {isOpen && (
        <StorageGroupModal
          isOpen={isOpen}
          setModalStatus={setStorageGroupsModalStatus}
          modalAction={modalAction}
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
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Название</TableCell>
              <TableCell align="center">Путь</TableCell>
              <TableCell align="center">Дата создания</TableCell>
              <TableCell align="center">Размер</TableCell>
              <TableCell align="center">Тип</TableCell>
              <TableCell align="center">Создатель</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {group?.files?.storages?.map((item: any) => (
              <TableRow
                key={item.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { backgroundColor: '#edeef0' },
                }}
              >
                <TableCell align="center">{item.title}</TableCell>
                <TableCell align="center">{`${apiUrl}${item.name}`}</TableCell>
                <TableCell align="center">{`${moment(item.created_at).format(
                  'DD.MM.YY'
                )}`}</TableCell>
                <TableCell align="center">{formatBytes(item.size)}</TableCell>
                <TableCell align="center">{item.type}</TableCell>
                <TableCell align="center">{item.user?.username}</TableCell>
                <TableCell align="center">
                  <Button
                    sx={{ m: 1 }}
                    variant="contained"
                    onClick={() => {
                      setDelteModalOpen(true);
                      setDeleteId(item.id);
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {group?.files && (
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
