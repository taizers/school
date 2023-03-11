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
import UserModal from './UserModal/index';
import DeleteIcon from '@mui/icons-material/Delete';

import { useNavigate } from 'react-router-dom';

import DotMenu from '../../components/DotMenu/index';
import { UsersType } from '../../constants/tsSchemes';
import { StyledPageTitle } from '../../styled';

type UsersComponetTypes = {
  getAllUsers: (page: number, limit: number) => Promise<any>;
  getGroupsList: () => Promise<any>;
  clearUser: () => void;
  setUserModalStatus: (data: boolean) => void;
  isLoading: boolean;
  users: { users: any; page: number; totalPages: number };
  user: any;
  isOpen: boolean;
  groupsList: any;
  deleteUser: (id: string) => Promise<any>;
  getUser: (id: string) => Promise<any>;
  createUser: (data: any) => Promise<any>;
  updateUser: (data: any, id: string) => Promise<any>;
};

export const Users: FC<UsersComponetTypes> = ({
  getAllUsers,
  users,
  user,
  isLoading,
  deleteUser,
  updateUser,
  createUser,
  getGroupsList,
  clearUser,
  groupsList,
  getUser,
  isOpen,
  setUserModalStatus,
}) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userId, setUserId] = useState<any>(null);
  const [limit, setLimit] = useState(10);
  const [isDelteModalOpen, setDelteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<any>(null);

  const history = useNavigate();

  useEffect(() => {
    getAllUsers(page, limit);
    getGroupsList();
  }, []);

  useEffect(() => {
    if (users) {
      setPage(users?.page);
      setTotalPages(users?.totalPages);
    }
  }, [users]);

  const onShowMoreClick = (id: string) => {
    history(`/users/${id}`);
  };

  const onDeleteUser = () => {
    if (deleteId) {
      deleteUser(deleteId);
    }
  };

  const onPaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (true) {
      window.scrollTo(0, 0);
      setPage(value);
      getAllUsers(value, limit);
    }
  };

  const modalAction = (data: any) => {
    if (user) {
      updateUser(data, user.id);
    } else {
      createUser(data);
    }
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <StyledPageTitle>Пользователи</StyledPageTitle>
      <Button
        variant="contained"
        sx={{ m: 1 }}
        onClick={() => setUserModalStatus(true)}
      >
        Создать пользователя
      </Button>
      {isOpen && (
        <UserModal
          isOpen={isOpen}
          setModalStatus={setUserModalStatus}
          groupsList={groupsList}
          user={user}
          getUser={getUser}
          setUserId={setUserId}
          userId={userId}
          clearUser={clearUser}
          modalAction={modalAction}
        />
      )}
      {isDelteModalOpen && (
        <DeleteModal
          isOpen={isDelteModalOpen}
          item={'Пользователя'}
          setModalStatus={setDelteModalOpen}
          deleteAction={onDeleteUser}
        />
      )}
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Имя</TableCell>
              <TableCell align="center">Почта</TableCell>
              <TableCell align="center">Должность</TableCell>
              <TableCell align="center">Роль</TableCell>
              <TableCell align="center">Секретный ключ</TableCell>
              <TableCell align="center">Группа</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.users?.map((item: any) => (
              <TableRow
                key={item.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { backgroundColor: '#edeef0' },
                }}
              >
                <TableCell align="left">{item.id}</TableCell>
                <TableCell component="th" scope="row">
                  {item.username}
                </TableCell>
                <TableCell align="center">{item.email}</TableCell>
                <TableCell align="center">{item.post}</TableCell>
                <TableCell align="center">{item.role}</TableCell>
                <TableCell align="center">{item.activationkey}</TableCell>
                <TableCell align="center">{item.group?.title}</TableCell>
                <TableCell align="center">
                  <DotMenu
                    id={item.id}
                    onShowMoreClick={onShowMoreClick}
                    onEditClick={() => {
                      setUserId(item.id);
                      setUserModalStatus(true);
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
      {users && (
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
