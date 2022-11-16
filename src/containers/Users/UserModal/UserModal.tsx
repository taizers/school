import React, { FC, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { UserType, UpdateUserType } from '../../../constants/tsSchemes';

type UserModalType = {
  user: UserType;
  isOpen: boolean;
  groupsList: any;
  userId: any;
  modalAction: (data: any) => void;
  setUserId: (data: any) => void;
  clearUser: () => void;
  getUser: (id: string) => Promise<any>;
  setModalStatus: (data: boolean) => void;
};

export const UserModal: FC<UserModalType> = ({
  user,
  isOpen,
  userId,
  modalAction,
  groupsList,
  setUserId,
  getUser,
  clearUser,
  setModalStatus,
}) => {
  const [name, setName] = useState<any>('');
  const [post, setPost] = useState<any>('');
  const [role, setRole] = useState<any>('user');
  const [phone, setPhone] = useState<any>('');
  const [group, setGroup] = useState<any>('');
  const [activationkey, setActivationkey] = useState<any>('');

  useEffect(() => {
    if (userId) {
      getUser(userId);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setName(user?.username);
      setPost(user?.post || '');
      setRole(user?.role);
      setGroup(user?.group?.id);
      setPhone(user?.phone);
      setActivationkey(user?.activationkey);
    }
  }, [user]);

  const handleClose = () => {
    setModalStatus(false);
    clearUser();
    setUserId(null);
  };

  const onSubmitForm = () => {
    const data = {
      username: name,
      role,
      phone: phone || null,
      post: post || null,
      activationkey: activationkey || null,
      group_id: group || null,
    };

    modalAction(data);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Редактирование профиля</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Имя"
          type="text"
          fullWidth
          variant="standard"
          value={name}
          onChange={(evt: any) => setName(evt.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="post"
          label="Пост"
          type="text"
          fullWidth
          value={post}
          variant="standard"
          onChange={(evt: any) => setPost(evt.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="post"
          label="Телефон"
          type="text"
          fullWidth
          value={phone}
          variant="standard"
          onChange={(evt: any) => setPhone(evt.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="post"
          label="Ключ Активации"
          type="text"
          fullWidth
          value={activationkey}
          variant="standard"
          onChange={(evt: any) => setActivationkey(evt.target.value)}
        />
        <FormControl sx={{ minWidth: '100%' }}>
          <InputLabel id="demo-simple-select-autowidth-label">Роль</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={role}
            sx={{ width: '100%' }}
            onChange={(evt: any) => setRole(evt.target.value)}
            label="Пользователь"
          >
            <MenuItem value={'user'}>Пользователь</MenuItem>
            <MenuItem value={'admin'}>Администратор</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: '100%' }}>
          <InputLabel id="demo-simple-select-autowidth-label1">
            Группа
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label1"
            id="demo-simple-select-autowidth1"
            value={group}
            sx={{ width: '100%' }}
            onChange={(evt: any) => setGroup(evt.target.value)}
            label="нет группы"
          >
            <MenuItem value="">
              <em>Нет</em>
            </MenuItem>
            {groupsList?.map((item: { title: string; id: number }) => (
              <MenuItem key={`${item.title} ${item.id}`} value={item.id}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button onClick={onSubmitForm}>Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
};
