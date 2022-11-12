import React, {FC} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type DeleteModalType = {
    isOpen: boolean;
    item: string;
    setModalStatus: (data: boolean) => void;
    deleteAction: () => void;
}

export const DeleteModal: FC<DeleteModalType> = ({isOpen, item, setModalStatus, deleteAction}) => {
    const handleClose = () => {
        setModalStatus(false);
    };

    const handleSubmit = () => {
        deleteAction();
        setModalStatus(false);
    };

    return (
        <Dialog
        open={isOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Вы действительно хотите удалить ${item}?`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Отменить</Button>
          <Button onClick={handleSubmit} autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    );
}