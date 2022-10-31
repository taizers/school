import React, { FC, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { StyledImage, StyledTitle } from './styled';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageViewer from 'react-simple-image-viewer';

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

export const Galery: FC<any> = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // getBook(id);
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
        {galery?.photos?.map((item, index) => (
          <StyledImage
            key={`photo ${item.id}`}
            onClick={() => openImageViewer(index)}
            src={item.url}
            height="200"
            width="300"
            alt="Фото из альбома"
          />
        ))}
      </Box>
      <Box>
        {isViewerOpen && (
          <ImageViewer
            src={galery?.photos?.map((item) => item.url)}
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
