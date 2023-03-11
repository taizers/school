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
import Checkbox from '@mui/material/Checkbox';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';
import dayjs, { Dayjs } from 'dayjs';
import Radio from '@mui/material/Radio';
import UploadFile from '../../../components/UploadFile/index';
import DatePicker from '../../../components/DatePicker/index';
import { apiUrl, maxCountFilesInGalery } from '../../../constants/constants';
import { createToast } from '../../../utils/toasts';

type UpdateGaleryModalType = {
  isOpen: boolean;
  galeryId: any;
  galery: any;
  updateGalery: (data: any, id: string) => Promise<any>;
  getGalery: (data: any) => Promise<any>;
  setModalStatus: (data: boolean) => void;
  setGaleryId: (data: any) => void;
};

export const UpdateGaleryModal: FC<UpdateGaleryModalType> = ({
  isOpen,
  updateGalery,
  galeryId,
  galery,
  setGaleryId,
  getGalery,
  setModalStatus,
}) => {
  const [title, setTitle] = useState<string>('');
  const [deleted, setDeleted] = useState<any>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [cover, setCover] = useState<any>('');
  const [date, setDate] = useState<any>(dayjs(Date.now()));

  useEffect(() => {
    if (galeryId) {
      getGalery(galeryId);
    }
  }, []);

  useEffect(() => {
    console.log(cover);
  }, [cover]);

  useEffect(() => {
    if (galery) {
      setTitle(galery.title);
      setDate(galery.created_at);
      setGaleryId(null);

      if (galery.items?.length) {
        galery.items.forEach((item: any) => {
          if (item.name === galery.cover) {
            setCover(item.id);
          }
        });
      }
    }
  }, [galery]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setModalStatus(false);
  };

  const onModalSubmit = () => {
    const formData = new FormData();

    const deletedString = deleted.join(' ');

    if (
      galery?.items.length - deleted.length + files.length >
      maxCountFilesInGalery
    ) {
      createToast.error(
        `Максимальное число фотографий: ${maxCountFilesInGalery}`
      );
      return;
    }

    if (deleted.includes(cover.toString())) {
      createToast.error('Нельзя удалить обложку');
      return;
    }

    formData.append('title', title);
    formData.append('created_at', date);

    if (cover) {
      formData.append('cover', cover);
    }

    formData.append('deleted', deletedString);

    files?.forEach((item: any) => {
      formData.append('files', item.file);
    });

    updateGalery(formData, galery.id);
  };

  const onCheckBoxClick = (evt: any) => {
    const id = evt?.target?.value;
    const arr = [...deleted];

    if (arr.includes(id)) {
      arr.splice(arr.indexOf(id), 1);
    } else {
      arr.push(id);
    }

    setDeleted(arr);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCover(event.target.value);
  };

  return (
    <Box sx={{}}>
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={handleClose}
        onSubmit={onModalSubmit}
      >
        <DialogTitle>Редактировать Альбом</DialogTitle>
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
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'space-evenly',
            }}
          >
            {galery?.items?.map((item: any) => {
              return (
                <Box
                  key={`${item.name}${item.id}`}
                  sx={{ display: 'flex', gap: '20px' }}
                >
                  <img
                    height="100px"
                    width="200px"
                    src={`${apiUrl}${item.name}`}
                    alt="Фото из Галереи"
                  />
                  <Checkbox
                    value={item.id}
                    icon={<DeleteOutlineIcon />}
                    checkedIcon={<DeleteIcon />}
                    onClick={onCheckBoxClick}
                  />
                  <Radio
                    checked={+cover === +item.id}
                    onChange={handleRadioChange}
                    value={item.id}
                    name="radio-buttons"
                    inputProps={{ 'aria-label': item.id }}
                  />
                </Box>
              );
            })}
          </Box>
          <DatePicker date={date} setDate={setDate} />
          <UploadFile files={files} setFiles={setFiles} isMultiply />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={onModalSubmit}>Редактировать</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
