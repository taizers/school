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
import moment from 'moment';

import { useNavigate } from 'react-router-dom';

import DotMenu from '../../components/DotMenu/index';

type StorageGroupsTypes = {
  getAllStorageGroups: (page: number, limit: number) => Promise<any>;
  setStorageGroupsModalStatus: (data: boolean) => void;
  isLoading: boolean;
  groups: any;
  isOpen: boolean;
  deleteStorageGroup: (id: string) => Promise<any>;
  createStorageGroup: (data: any) => Promise<any>;
  updateStorageGroup: (data: any, id: string) => Promise<any>;
};

export const StorageGroups: FC<StorageGroupsTypes> = ({
  getAllStorageGroups,
  setStorageGroupsModalStatus,
  isLoading,
  groups,
  isOpen,
  deleteStorageGroup,
  createStorageGroup,
  updateStorageGroup,
}) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [group, setGroup] = useState<any>(null);
  const [limit, setLimit] = useState(10);
  const [isDelteModalOpen, setDelteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<any>(null);

  const history = useNavigate();

  useEffect(() => {
    console.log('+++');
    getAllStorageGroups(page, limit);
  }, []);

  useEffect(() => {
    if (groups) {
      setPage(groups?.page);
      setTotalPages(groups?.totalPages);
      setGroup(null);
    }
  }, [groups]);

  const onShowMoreClick = (id: string) => {
    history(`/storages/${id}`);
  };

  const onDeleteUser = () => {
    if (deleteId) {
      deleteStorageGroup(deleteId);
    }
  };

  const onPaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (true) {
      window.scrollTo(0, 0);
      setPage(value);
      getAllStorageGroups(value, limit);
    }
  };

  const modalAction = (data: any) => {
    if (group) {
      updateStorageGroup(data, group.id);
    } else {
      createStorageGroup(data);
    }
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Button
        variant="contained"
        sx={{ m: 1 }}
        onClick={() => setStorageGroupsModalStatus(true)}
      >
        {'Создать Группу'}
      </Button>
      {isOpen && (
        <StorageGroupModal
          isOpen={isOpen}
          setModalStatus={setStorageGroupsModalStatus}
          group={group}
          setGroup={setGroup}
          modalAction={modalAction}
        />
      )}
      {isDelteModalOpen && (
        <DeleteModal
          isOpen={isDelteModalOpen}
          item={'Группу файлов'}
          setModalStatus={setDelteModalOpen}
          deleteAction={onDeleteUser}
        />
      )}
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Название</TableCell>
              <TableCell align="center">Дата создания</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups?.storageGroups?.map((item: any) => (
              <TableRow
                key={item.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { backgroundColor: '#edeef0' },
                }}
              >
                <TableCell align="left">{item.id}</TableCell>
                <TableCell align="center">{item.title}</TableCell>
                <TableCell align="center">{`${moment(item.created_at).format(
                  'DD.MM.YY'
                )}`}</TableCell>
                <TableCell align="center">
                  <DotMenu
                    id={item.id}
                    onShowMoreClick={onShowMoreClick}
                    onEditClick={() => {
                      setGroup(item);
                      setStorageGroupsModalStatus(true);
                    }}
                    onDeleteClick={() => {
                      setDeleteId(item.id);
                      setDelteModalOpen(true);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {groups && (
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
