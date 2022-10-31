import React, { FC } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import Box from '@mui/material/Box';
import MainMenu from '../../components/MainMenu/index';
import SubMenu from '../../components/SubMenu/index';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import HaventAccess from '../../components/HaventAccess';
import HomePage from '../../components/HomePage';
import NotFound from '../../components/NotFound/index';
import TeachersPage from '../../containers/TeachersPage/index';
import Galeries from '../../containers/Galeries/index';
import Galery from '../../components/Galery/index';
import CreateGaleryPage from '../Galeries/CreateGaleryModal/index';
import News from '../../containers/News/index';
import NewsItem from '../../components/NewsItem/index';
import {
  PublicRoute,
  PrivateRoute,
  PublicRouteWithSideBar,
} from '../../router/components/index';
import { Link } from 'react-router-dom';
import { StyledLink, StyledImage } from './styled';

type MainType = {};

const responsiveSettings = [
  {
    breakpoint: 1200,
    settings: {
      slidesToShow: 8,
      slidesToScroll: 8,
    },
  },
  {
    breakpoint: 500,
    settings: {
      slidesToShow: 5,
      slidesToScroll: 5,
    },
  },
  {
    breakpoint: 300,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3,
    },
  },
];

const slides = [
  {
    id: 1,
    url: '/static/images/school.jpg',
    link: '/f1',
  },
  {
    id: 2,
    url: '/static/images/school.jpg',
    link: '/f1',
  },
  {
    id: 3,
    url: '/static/images/school.jpg',
    link: '/f1',
  },
  {
    id: 4,
    url: '/static/images/school.jpg',
    link: '/f1',
  },
  {
    id: 5,
    url: '/static/images/school.jpg',
    link: '/f1',
  },
];

export const Main: FC<MainType> = ({}) => {
  return (
    <Box sx={{ height: '100%' }}>
      <Header />
      <MainMenu />
      <Box
        sx={{
          display: 'flex',
          '@media screen and (max-width: 600px)': {
            flexDirection: 'column',
            alignItems: 'center',
          },
        }}
      >
        <SubMenu />
        <Box sx={{ width: '100%', p: '5px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/administration" element={<HaventAccess />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/galeries" element={<Galeries />} />
            <Route path="/galeries/:id" element={<Galery />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsItem />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </Box>
      <Box sx={{ m: '20px 10px' }}>
        <Slide
          slidesToScroll={1}
          slidesToShow={1}
          indicators={true}
          responsive={responsiveSettings}
        >
          {slides.map((item) => (
            <StyledLink key={`sliderlink ${item.id}`} to={`${item.link}`}>
              <StyledImage
                src={item.url}
                alt="слайд"
                height="150"
                width="200"
              />
            </StyledLink>
          ))}
        </Slide>
      </Box>

      <Footer />
    </Box>
  );
};
