import React, { FC } from 'react';
import { StyledFooter, StyledListItem, StyledList } from './styled';
import Box from '@mui/material/Box';

export const Footer: FC<any> = () => {
  return (
    <Box sx={{ backgroundColor: 'gray' }} className="container">
      <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly',}}>
        <StyledList>
          <StyledListItem>Средняя школа № 3 г.Волковыска</StyledListItem>
          <StyledListItem>Телефон: 8(01512) 9-43-80</StyledListItem>
          <StyledListItem>Email: sh3volkovysk@uovrik.by</StyledListItem>
        </StyledList>
        <StyledList>
          <StyledListItem>
            <img
              src="/static/images/school.jpg"
              alt="Герб школы"
              width="220"
              height="120"
            />
          </StyledListItem>

        </StyledList>
      </Box>
    </Box>
  );
};
