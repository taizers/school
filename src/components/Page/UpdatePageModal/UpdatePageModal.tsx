import React, { FC, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DatePicker from '../../DatePicker/index';
import PageEditor from '../../PageEditor/index';
import dayjs from 'dayjs';
import { createToast } from '../../../utils/toasts';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type UpdatePageModalType = {
  modalAction: (data: any) => void;
  setModalStatus: (data: any) => void;
  getPagesList: () => Promise<any>;
  isOpen: boolean;
  pagesList: any;
  page: any;
};

export const UpdatePageModal: FC<UpdatePageModalType> = ({
  modalAction,
  isOpen,
  page,
  pagesList,
  getPagesList,
  setModalStatus,
}) => {
  const [title, setTitle] = useState<any>('');
  const [content, setContent] = useState<any>('');
  const [mainpage, setMainpage] = useState<any>('');
  const [date, setDate] = useState<any>(dayjs(Date.now()));

  useEffect(() => {
    getPagesList();
  }, []);

  useEffect(() => {
    if (page) {
      setTitle(page.title);
      setContent(page.content);
      setMainpage(page.mainpage_id || '');
      setDate(page.created_at);
    }
  }, [page]);

  const onModalClose = () => {
    setModalStatus(false);
  };

  const onChangeTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const onModalSubmit = () => {
    if (!title || !content) {
      return createToast.error('Не введены Заголовок, либо Контент');
    }

    const data = {
      title,
      content,
      created_at: date,
      mainpage_id: mainpage || null,
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
          id="name"
          label="Название"
          type="text"
          fullWidth
          variant="standard"
          value={title}
          onChange={onChangeTitle}
        />
        <FormControl sx={{ minWidth: '100%' }}>
          <InputLabel id="demo-simple-select-autowidth-label1">
            Родительская страница
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label1"
            id="demo-simple-select-autowidth1"
            value={mainpage}
            sx={{ width: '100%' }}
            onChange={(evt: any) => setMainpage(evt.target.value)}
            label="нет группы"
          >
            <MenuItem value="">
              <em>Нет</em>
            </MenuItem>
            {pagesList?.map((item: { title: string; id: number }) => (
              <MenuItem key={`${item.title} ${item.id}`} value={item.id}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <DatePicker date={date} setDate={setDate} />
        <PageEditor content={content} setContent={setContent} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onModalClose}>Отмена</Button>
        <Button onClick={onModalSubmit}>Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
};
