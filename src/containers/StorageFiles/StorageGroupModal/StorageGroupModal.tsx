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
import DatePicker from '../../../components/DatePicker';
import dayjs from 'dayjs';
import { createToast } from '../../../utils/toasts';
import UploadFile from '../../../components/UploadFile';

type StorageGroupModalType = {
  isOpen: boolean;
  modalAction: (data: any) => void;
  setModalStatus: (data: boolean) => void;
};

export const StorageGroupModal: FC<StorageGroupModalType> = ({
  isOpen,
  modalAction,
  setModalStatus,
}) => {
  const [title, setTitle] = useState<any>('');
  const [date, setDate] = useState<any>(dayjs(Date.now()));
  const [file, setFile] = useState<any>();

  const handleClose = () => {
    setModalStatus(false);
  };

  const onSubmitForm = () => {
    const formData = new FormData();

    if (!title) {
      return createToast.error('Не введён Заголовок');
    }

    formData.append('title', title);
    formData.append('created_at', date);
    if (file) {
      formData.append('file', file[0]?.file);
    } else {
      createToast.error('Файл является обязательным параметром');
      return;
    }

    modalAction(formData);
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
          value={title}
          onChange={(evt: any) => setTitle(evt.target.value)}
        />
        <DatePicker date={date} setDate={setDate} />
        <UploadFile
          files={file}
          setFiles={setFile}
          accepted={['application/*', 'image/*', 'video/*']}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button onClick={onSubmitForm}>Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
};
