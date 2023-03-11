import React, { FC, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { UserType } from '../../constants/tsSchemes';
import UploadFile from '../../components/UploadFile';
import { createToast } from '../../utils/toasts';

type UpdateUserModalType = {
  user: UserType;
  isOpen: boolean;
  updateProfile: (data: any) => Promise<any>;
  setProfileModal: (data: boolean) => void;
};

export const UpdateUserModal: FC<UpdateUserModalType> = ({
  user,
  updateProfile,
  setProfileModal,
  isOpen,
}) => {
  const [name, setName] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [file, setFile] = useState<any>();

  const handleClose = () => {
    setProfileModal(false);
  };

  const onChangeName = (e: any) => {
    setName(e.target.value);
  };

  const onChangeOldPassword = (e: any) => {
    setOldPassword(e.target.value);
  };

  const onChangeNewPAssword = (e: any) => {
    setNewPassword(e.target.value);
  };

  const onSubmitForm = () => {
    const formData = new FormData();

    if ((oldPassword && !newPassword) || (!oldPassword && newPassword)) {
      return createToast.error('Ошибка валидации');
    }

    if (oldPassword && newPassword) {
      formData.append('old_password', oldPassword);
      formData.append('new_password', newPassword);
    }

    if (name) {
      formData.append('username', name);
    }

    if (file) {
      formData.append('file', file[0]?.file);
    }

    updateProfile(formData);
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Редактирование профиля</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Имя"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={user.username || ''}
            onChange={onChangeName}
          />
          <TextField
            autoFocus
            margin="dense"
            id="oldPassword"
            label="Старый пароль"
            type="password"
            fullWidth
            variant="standard"
            onChange={onChangeOldPassword}
          />
          <TextField
            autoFocus
            margin="dense"
            id="newPassword"
            label="Новый пароль"
            type="password"
            fullWidth
            variant="standard"
            onChange={onChangeNewPAssword}
          />
          <UploadFile files={file} setFiles={setFile} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={onSubmitForm}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
