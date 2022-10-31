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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { FilePond, registerPlugin } from 'react-filepond';

import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const galery = {
  title: 'Название Альбома',
  photos: [
    {
      id: 1,
      url: '/static/images/school.jpg',
    },
    {
      id: 2,
      url: '/static/images/school.jpg',
    },
    {
      id: 3,
      url: '/static/images/school.jpg',
    },
    {
      id: 4,
      url: '/static/images/school.jpg',
    },
    {
      id: 5,
      url: '/static/images/images.jpg',
    },
  ],
};

export const CreateGaleryModal: FC<any> = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [files, setFiles] = useState<any>([]);
  const [date, setDate] = useState<any>(dayjs(Date.now()));

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setTitle('');
    setFiles([]);
    setDate(dayjs(Date.now()));
    setOpen(false);
  };

  const onModalSubmit = () => {
    setOpen(false);
    const formData = new FormData();

    formData.append('title', title);
    formData.append('published', date);

    files.forEach((item: any) => {
      formData.append('images[]', item);
    });

    console.log(formData);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    handleClose();
  };

  return (
    <Box sx={{}}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Создать альбом
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              label="Дата публикации"
              inputFormat="DD/MM/YYYY"
              value={date}
              onChange={(value) => setDate(value)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <FilePond
            files={files}
            onupdatefiles={setFiles}
            maxFiles={15}
            allowMultiple={true}
            accepted-file-types="image/jpeg, image/png"
            name="files"
            labelIdle='Ператащите изображения либо <span class="filepond--label-action">Откройте</span>'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={onModalSubmit}>Создать</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
