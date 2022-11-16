import React, { FC, useState, useEffect } from 'react';
import './style.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import CreatePageModal from './CreatePageModal/index';

type SubMenuType = {
  isLoading: boolean;
  isOpen: boolean;
  isAuth: boolean;
  pagesList: any;
  pages: any;
  getPages: () => Promise<any>;
  setCreatePageModalStatus: (data: boolean) => void;
  createPage: (data: any) => Promise<any>;
  getPagesList: () => Promise<any>;
};

export const SubMenu: FC<SubMenuType> = ({
  isLoading,
  isOpen,
  isAuth,
  pages,
  getPages,
  pagesList,
  setCreatePageModalStatus,
  createPage,
  getPagesList,
}) => {
  useEffect(() => {
    getPages();
  }, []);

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {isAuth && <Button
        variant="outlined"
        sx={{ m: 1 }}
        onClick={() => setCreatePageModalStatus(true)}
      >
        Создать страницу
      </Button>}
      {isOpen && (
        <CreatePageModal
          isOpen={isOpen}
          modalAction={createPage}
          getPagesList={getPagesList}
          pagesList={pagesList}
          setModalStatus={setCreatePageModalStatus}
        />
      )}
      {
        pages && <div className="subnav" id="subnav">
          {pages.map((page: any) => {
              if (page.subpages?.length) {
                return (
                  <div key={`page ${page.id}`} className="dropdown">
                    <button className="dropbtn">
                      <Link to={`/pages/${page.id}`}>
                        <span className="dropbtn-text">{page.title}</span>
                        <span className="caret-down">&#x25BC;</span>
                      </Link>
                    </button>
                    <div className="dropdown-content">
                      {
                        page.subpages?.map((subpage: any) => <Link key={`subpage ${subpage.id}`} to={`/pages/${subpage.id}`}>{subpage.title}</Link>)
                      }
                    </div>
                  </div>
                )
              } else {
                return <Link key={`page ${page.id}`} to={`/pages/${page.id}`}>{page.title}</Link>
              }
          })}
        </div>
      }
    </Box>
  );
};
