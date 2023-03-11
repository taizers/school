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
import TeachersPage from '../TeachersPage/index';
import AdministrationPage from '../AdministrationPage/index';
import Galeries from '../Galeries/index';
import Schedule from '../Schedule/index';
import ScheduleRings from '../ScheduleRings/index';
import ScheduleQuartersAndHolidays from '../ScheduleQuartersAndHolidays/index';
import Galery from '../../components/Galery/index';
import News from '../News/index';
import Users from '../Users/index';
import Profile from '../Profile/index';
import NewsItem from '../../components/NewsItem/index';
import {
  PublicRoute,
  PrivateRoute,
  PrivateAdminRoute,
} from '../../router/components/index';
import { Link } from 'react-router-dom';
import { StyledLink, StyledImage } from './styled';
import StorageFiles from '../StorageFiles/index';
import StorageGroups from '../StorageGroups/index';
import Page from '../../components/Page/index';

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
        className="container"
        sx={{
          display: 'flex',
          '@media screen and (max-width: 1000px)': {
            flexDirection: 'column',
            alignItems: 'center',
          },
        }}
      >
        <SubMenu />
        <Box sx={{ width: '100%', p: '5px', overflow: 'hidden' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/administration" element={<AdministrationPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/galeries" element={<Galeries />} />
            <Route path="/galeries/:id" element={<Galery />} />
            <Route path="/pages/:id" element={<Page />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsItem />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/schedule/rings" element={<ScheduleRings />} />
            <Route
              path="/schedule/quarters-and-holidays"
              element={<ScheduleQuartersAndHolidays />}
            />
            <Route
              path="/users"
              element={<PrivateAdminRoute component={<Users />} />}
            />
            <Route
              path="/profile"
              element={<PrivateRoute component={<Profile />} />}
            />
            <Route
              path="/storages"
              element={<PrivateRoute component={<StorageGroups />} />}
            />
            <Route
              path="/storages/:id"
              element={<PrivateRoute component={<StorageFiles />} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </Box>
      <Box sx={{ m: '20px 10px' }} className="container">
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
