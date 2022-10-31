import './style.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';

export const MainMenu = () => {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open = Boolean(anchorEl);

  const handleClickOnAvatar = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="mainnav-wrapper">
      <div className="mainnav" id="mainnav">
        <Link to="/">Главная</Link>
        <Link to="/administration">Администрация</Link>
        <Link to="/teachers">Учительская</Link>
        <Link to="/news">Новости</Link>
        <Link to="/galeries">Фотоальбом</Link>
        <div className="dropdown">
          <button className="dropbtn">
            <Link to="/schedule">
              <span className="dropbtn-text">Расписание</span>
              <span className="fa-caret-down">&#x25BC;</span>
            </Link>
          </button>
          <div className="dropdown-content">
            <Link to="/schedule/rings">Расписание звонков</Link>
            <Link to="/schedule/vacations">Расписание четвертей и каникул</Link>
            <Link to="/schedule/class">Расписание классов</Link>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">
            <Link to="/electronic-appeals">
              <span className="dropbtn-text">Электронные обращения</span>
              <span className="fa-caret-down">&#x25BC;</span>
            </Link>
          </button>
          <div className="dropdown-content">
            <Link to="/electronic-appeals/individual">Физического лица</Link>
            <Link to="/electronic-appeals/legal-entity-and-individual-entrepreneur">
              Юридического лица и индивидуального предпринимателя
            </Link>
            <Link to="/electronic-appeals/requirements">
              Требования к оформлению и порядок рассмотрения обращений
            </Link>
          </div>
        </div>
        <div className="dropdown avatar-btn">
          <button className="dropbtn">
            <a href="javascript:void(0);">
              <img
                className="avatar"
                src="/static/images/school.jpg"
                alt="avatar"
              />
            </a>
          </button>
          <div className="dropdown-content">
            <Link to="/profile">Профиль</Link>
            <Link to="/settings">Настройки сайта</Link>
            <Link to="/">Выход</Link>
          </div>
        </div>

        <a
          href="javascript:void(0);"
          className="icon"
          onClick={() => {
            let x: any = document.getElementById('mainnav');
            if (x.className === 'mainnav') {
              x.className += ' responsive';
            } else {
              x.className = 'mainnav';
            }
          }}
        >
          &#9776;
        </a>
      </div>
    </div>
  );
};
