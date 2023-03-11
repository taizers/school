import './style.css';
import React, { useState, FC } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../constants/constants';

type MainMenuType = {
  isAuth: boolean;
  role: string;
  user: any;
  logout: (history: any) => Promise<any>;
};

export const MainMenu: FC<MainMenuType> = ({ isAuth, role, user, logout }) => {
  let history = useNavigate();

  const onEventOff = (evt: any) => evt.preventDefault();

  const OpenCloseButtonClick = (evt: any) => {
    onEventOff(evt);
    onElementClick(null);
  };

  const onLogoutClick = () => {
    onElementClick(null);
    logout(history);
  };

  const onElementClick = (evt: any) => {
    let x: any = document.getElementById('mainnav');
    if (x.className === 'mainnav container') {
      x.className += ' responsive';
    } else {
      x.className = 'mainnav container';
    }
    
  };

  return (
    <div className="mainnav-wrapper ">
      <div className="mainnav container" id="mainnav">
        <Link key="main link 1" to="/">
          Главная
        </Link>
        <Link onClick={onElementClick} key="main link 2" to="/administration">
          Администрация
        </Link>
        <Link onClick={onElementClick} key="main link 3" to="/teachers">
          Учительская
        </Link>
        <Link onClick={onElementClick} key="main link 4" to="/news">
          Новости
        </Link>
        <Link onClick={onElementClick} key="main link 5" to="/galeries">
          Фотоальбом
        </Link>
        <div key="main menu 2" className="dropdown">
          <button className="dropbtn">
            <Link onClick={onElementClick} to="/schedule">
              <span className="dropbtn-text">Расписание</span>
              <span className="fa-caret-down">&#x25BC;</span>
            </Link>
          </button>
          <div className="dropdown-content">
            <Link onClick={onElementClick} to="/schedule/rings">
              Расписание звонков
            </Link>
            <Link onClick={onElementClick} to="/schedule/quarters-and-holidays">
              Расписание четвертей и каникул
            </Link>
            <Link onClick={onElementClick} to="/schedule/classes">
              Расписание классов
            </Link>
          </div>
        </div>
        <Link onClick={onElementClick} key="main link 6" to="/electronic-appeals">
          Электронные обращения
        </Link>
        <div key="main menu 4" className="dropdown avatar-btn">
          <button className="dropbtn">
            <a onClick={onElementClick} href="/profile">
              <img
                className="avatar"
                src={
                  user?.avatar ? `${apiUrl}${user.avatar}` : '/static/images/no-image.jpg'
                }
                alt="avatar"
              />
            </a>
          </button>
          <div className="dropdown-content">
            {!isAuth && (
              <Link onClick={onElementClick} key="user link 1" to="/login">
                Войти
              </Link>
            )}
            {!isAuth && (
              <Link onClick={onElementClick} key="user link 2" to="/sign-up">
                Зарегистрироваться
              </Link>
            )}
            {isAuth && (
              <Link onClick={onElementClick} key="user link 3" to="/profile">
                Профиль
              </Link>
            )}
            {/* {isAuth && role === 'admin' && (
              <Link onClick={onElementClick} key="user link 4" to="/settings">
                Настройки сайта
              </Link>
            )} */}
            {isAuth && role === 'admin' && (
              <Link onClick={onElementClick} key="user link 5" to="/users">
                Пользователи
              </Link>
            )}
            {isAuth && (
              <Link onClick={onElementClick} key="user link 6" to="/storages">
                Файловый архив
              </Link>
            )}
            {isAuth && (
              <Link key="user link 7" to="/" onClick={onLogoutClick}>
                Выход
              </Link>
            )}
          </div>
        </div>
        <a href="#!" className="icon" onClick={OpenCloseButtonClick}>
          &#9776;
        </a>
      </div>
    </div>
  );
};
