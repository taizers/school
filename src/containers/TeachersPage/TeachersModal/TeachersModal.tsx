import React, { FC, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DatePicker from '../../../components/DatePicker/index';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';

type TEachersModalType = {
  modalAction: (data: any) => void;
  setModalStatus: (data: any) => void;
  setGroupId: (data: any) => void;
  getGroup: (id: string) => Promise<any>;
  group?: any;
  isOpen: boolean;
  groupId: any;
};

export const TEachersModal: FC<TEachersModalType> = ({
  modalAction,
  group,
  isOpen,
  setModalStatus,
  setGroupId,
  getGroup,
  groupId,
}) => {
  const [title, setTitle] = useState<any>('');
  const [date, setDate] = useState<any>(dayjs(Date.now()));

  useEffect(() => {
    if (groupId) {
      getGroup(groupId);
    }
  }, []);

  useEffect(() => {
    if (group) {
      setTitle(group?.title);
      setDate(group?.created_at);
      setGroupId(null);
    }
  }, [group]);

  const onModalClose = () => {
    setModalStatus(false);
  };

  const onChangeTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const onModalSubmit = () => {
    const data = {
      title,
      created_at: date,
    };

    modalAction(data);
  };

  return (
    <Dialog
      disableEnforceFocus
      fullScreen
      scroll="body"
      open={isOpen}
      onClose={onModalClose}
      onSubmit={onModalSubmit}
    >
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '25px',
          minWidth: '500px',
          '@media screen and (max-width: 899px)': { minWidth: 'auto' },
        }}
      >
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Название"
          type="text"
          fullWidth
          variant="standard"
          value={title}
          onChange={onChangeTitle}
        />
        <DatePicker date={date} setDate={setDate} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onModalClose}>Отмена</Button>
        <Button onClick={onModalSubmit}>Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
};
