import React, { FC, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { StyledImage, StyledTitle } from './styled';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageViewer from 'react-simple-image-viewer';
import { apiUrl } from '../../constants/constants';

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

type GaleryType = {
  isLoading: boolean;
  galery: any;
  getGalery: (data: any) => Promise<any>;
}

export const Galery: FC<GaleryType> = ({getGalery, isLoading, galery}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getGalery(id);
    }
  }, []);

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <Box>
      <StyledTitle>{galery.title}</StyledTitle>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'space-around',
        }}
      >
        {galery?.items?.map((item: any, index: number) => (
          <StyledImage
            key={`photo ${item.id}`}
            onClick={() => openImageViewer(index)}
            src={`${apiUrl}${item.name}`}
            height="200"
            width="300"
            alt="Фото из альбома"
          />
        ))}
      </Box>
      <Box>
        {isViewerOpen && (
          <ImageViewer
            src={galery?.items?.map((item: any) => `${apiUrl}${item.name}`)}
            currentIndex={currentImage}
            disableScroll={true}
            closeOnClickOutside={true}
            onClose={closeImageViewer}
            backgroundStyle={{
              backgroundColor: 'rgba(0,0,0,0.9)',
            }}
          />
        )}
      </Box>
    </Box>
  );
};
