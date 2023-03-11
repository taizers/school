import React, { FC, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TeachersModal from './TeachersModal/index';
import PersonalCard from '../../components/PersonalCard/index';
import DeleteModal from '../../components/DeleteModal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { StyledGroupName } from './styled';
import { StyledPageTitle } from '../../styled';

type TeachersPageType = {
  groups: any;
  group: any;
  isAuth: boolean;
  role: string;
  isLoading: boolean;
  isOpen: boolean;
  getAllGroups: () => Promise<any>;
  updateGroup: (data: any, id: string) => Promise<any>;
  createGroup: (data: any) => Promise<any>;
  deleteGroup: (id: string) => Promise<any>;
  getGroup: (id: string) => Promise<any>;
  setGroupsModalStatus: (data: boolean) => void;
};

export const TeachersPage: FC<TeachersPageType> = ({
  groups,
  group,
  isOpen,
  isAuth,
  role,
  isLoading,
  updateGroup,
  getAllGroups,
  createGroup,
  deleteGroup,
  getGroup,
  setGroupsModalStatus,
}) => {
  const [groupId, setGroupId] = useState(null);
  const [isDeleteModalOpen, setDeleteModalStatus] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    getAllGroups();
  }, []);

  const modalAction = (data: any) => {
    if (group) {
      updateGroup(data, group.id);
    } else {
      createGroup(data);
    }
  };

  const onDelete = () => {
    if (deleteId) {
      deleteGroup(deleteId);
    }
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <StyledPageTitle>Учительская</StyledPageTitle>
      <Box>
        {isAuth && role === 'admin' && (
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => setGroupsModalStatus(true)}
          >
            {'Создать Группу'}
          </Button>
        )}
        {isDeleteModalOpen && (
          <DeleteModal
            item={'новость'}
            isOpen={isDeleteModalOpen}
            deleteAction={onDelete}
            setModalStatus={setDeleteModalStatus}
          />
        )}
        {isOpen && (
          <TeachersModal
            modalAction={modalAction}
            isOpen={isOpen}
            group={group}
            getGroup={getGroup}
            setGroupId={setGroupId}
            groupId={groupId}
            setModalStatus={setGroupsModalStatus}
          />
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {groups?.users?.map((teacher: any) => (
          <PersonalCard
            key={`${teacher.id} ${teacher.username}`}
            human={teacher}
          />
        ))}
      </Box>
      <Box>
        {groups?.groups?.map((item: any) => (
          <Box
            key={`${item.title} ${item.id}`}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: '0 20px',
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <StyledGroupName>{item.title}</StyledGroupName>
              <Box sx={{ display: 'flex' }}>
                {isAuth && role === 'admin' && (
                  <Button
                    variant="contained"
                    sx={{ m: 2 }}
                    onClick={() => {
                      setGroupsModalStatus(true);
                      setGroupId(item.id);
                    }}
                  >
                    <EditIcon />
                  </Button>
                )}
                {isAuth && role === 'admin' && (
                  <Button
                    sx={{ m: 2, ml: 0 }}
                    variant="contained"
                    onClick={() => {
                      setDeleteModalStatus(true);
                      setDeleteId(item.id);
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                )}
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {item.users?.length ? (
                item.users.map((teacher: any) => (
                  <PersonalCard
                    key={`${teacher.id} ${teacher.username}`}
                    human={teacher}
                  />
                ))
              ) : (
                <Box sx={{ m: 2, fontSize: '18px' }}>{'Нет учителей'}</Box>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
