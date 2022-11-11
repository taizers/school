import React, { FC, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { StyledImage, StyledTitle } from './styled';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import dayjs, { Dayjs } from 'dayjs';
import UploadFile from '../../../components/UploadFile/index';
import DatePicker from '../../../components/DatePicker/index';

type CreateGaleryModalType = {
  isOpen: boolean;
  createGalery: (data: any) => Promise<any>;
  setGaleriesModalStatus: (data: boolean) => void;
}

export const CreateGaleryModal: FC<CreateGaleryModalType> = ({isOpen, createGalery, setGaleriesModalStatus}) => {
  const [title, setTitle] = useState('');
  const [files, setFiles] = useState<any>([]);
  const [date, setDate] = useState<any>(dayjs(Date.now()));

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setGaleriesModalStatus(false);
  };

  const onModalSubmit = () => {
    const formData = new FormData();

    formData.append('title', title);
    formData.append('created_at', date);

    files?.forEach((item: any) => {
      formData.append('files', item.file);
    });

    createGalery(formData);
    // setGaleriesModalStatus(false);
  };

  return (
    <Box sx={{}}>
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={handleClose}
        onSubmit={onModalSubmit}
      >
        <DialogTitle>Создать Альбом</DialogTitle>
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
            required
            margin="dense"
            id="title"
            label="Название"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => setTitle(event.target.value)}
          />
          <DatePicker date={date} setDate={setDate} />
          <UploadFile files={files} setFiles={setFiles} isMultiply />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={onModalSubmit}>Создать</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
