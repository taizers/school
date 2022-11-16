import React, { FC, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import PersonalCard from '../../components/PersonalCard/index';
import { StyledGroupName } from './styled';

type AdministartionPageType = {
  group: any;
  isLoading: boolean;
  getAdministrationGroup: () => Promise<any>;
};

export const AdministrationPage: FC<AdministartionPageType> = ({
  group,
  isLoading,
  getAdministrationGroup,
}) => {
  useEffect(() => {
    getAdministrationGroup();
  }, []);

  return (
    <Box>
      {group && (
        <Box
          key={`${group.title} ${group.id}`}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: '0 20px',
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <StyledGroupName>{group.title}</StyledGroupName>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {group.users?.length ? (
              group.users.map((teacher: any) => (
                <PersonalCard
                  key={`${teacher.id} ${teacher.username}`}
                  human={teacher}
                />
              ))
            ) : (
              <Box sx={{ m: 2, fontSize: '18px' }}>{'Нет администрации'}</Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};
