import Button from '@mui/material/Button';
import React, { FC } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';



type DatePickerType = {
  date: any;
  setDate: (data: any) => void;
}

export const DatePicker: FC<DatePickerType> = ({date, setDate}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        label="Дата публикации"
        inputFormat="DD/MM/YYYY"
        value={date}
        onChange={(value) => setDate(value)}
        renderInput={(params) => <TextField {...params} />}
      />
  </LocalizationProvider>
  );
};
