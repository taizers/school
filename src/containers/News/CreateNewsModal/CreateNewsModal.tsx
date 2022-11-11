import React, { FC, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import UploadFile from '../../../components/UploadFile/index';
import DatePicker from '../../../components/DatePicker/index';
import PageEditor from '../../../components/PageEditor/index';
import dayjs, { Dayjs } from 'dayjs';
import { createToast } from '../../../utils/toasts';
import Button from '@mui/material/Button';

type CreateNewsModalType = {
  modalAction: (data: any) => Promise<any>;
  setModalStatus: (data: any) => void;
  setNews: (data: any) => void;
  news?: any;
  isOpen: boolean;
};

export const CreateNewsModal: FC<CreateNewsModalType> = ({
  modalAction,
  news,
  isOpen,
  setModalStatus,
  setNews
}) => {
  const [title, setTitle] = useState(news?.title || '');
  const [content, setContent] = useState<any>(news?.content || '');
  const [file, setFile] = useState<any>();
  const [date, setDate] = useState<any>(news?.created_at || dayjs(Date.now()));

  const onModalClose = () => {
    setModalStatus(false);
    setNews(null);
  };

  const onChangeTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const onModalSubmit = () => {
    const formData = new FormData();

    if (!title || !content) {
      return createToast.error('Не введены Заголовок, либо Контент')
    }

    formData.append('title', title);
    formData.append('content', content);
    formData.append('created_at', date);
    formData.append('file', file[0]?.file);

    modalAction(formData);
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
            id="name"
            label="Название"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={title}
            onChange={onChangeTitle}
          />
          <DatePicker date={date} setDate={setDate} />
          <UploadFile files={file} setFiles={setFile} />
          <PageEditor content={content} setContent={setContent} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onModalClose}>Отмена</Button>
          <Button onClick={onModalSubmit}>Сохранить</Button>
        </DialogActions>
      </Dialog>
  );
};
