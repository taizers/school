import './style.css';
import React, { useState, FC } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

type MainMenuType = {
  isAuth: boolean;
  role: string;
  logout: (history: any) => Promise<any>;
};

export const MainMenu: FC<MainMenuType> = ({ isAuth, role, logout }) => {
  let history = useNavigate();

  const onEventOff = (evt: any) => evt.preventDefault();

  const OpenCloseButtonClick = (evt: any) => {
    onEventOff(evt);
    onElementClick();
  };

  const onLogoutClick = () => {
    onElementClick();
    logout(history);
  };

  const onElementClick = () => {
    let x: any = document.getElementById('mainnav');
    if (x.className === 'mainnav') {
      x.className += ' responsive';
    } else {
      x.className = 'mainnav';
    }
  };

  return (
    <div className="mainnav-wrapper">
      <div className="mainnav" id="mainnav">
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
            <Link onClick={onElementClick} to="/schedule/vacations">
              Расписание четвертей и каникул
            </Link>
            <Link onClick={onElementClick} to="/schedule/class">
              Расписание классов
            </Link>
          </div>
        </div>
        <div key="main menu 3" className="dropdown">
          <button className="dropbtn">
            <Link onClick={onElementClick} to="/electronic-appeals">
              <span className="dropbtn-text">Электронные обращения</span>
              <span className="fa-caret-down">&#x25BC;</span>
            </Link>
          </button>
          <div className="dropdown-content">
            <Link
              onClick={onElementClick}
              key="link 1"
              to="/electronic-appeals/individual"
            >
              Физического лица
            </Link>
            <Link
              onClick={onElementClick}
              key="link 2"
              to="/electronic-appeals/legal-entity-and-individual-entrepreneur"
            >
              Юридического лица и индивидуального предпринимателя
            </Link>
            <Link
              onClick={onElementClick}
              key="link 3"
              to="/electronic-appeals/requirements"
            >
              Требования к оформлению и порядок рассмотрения обращений
            </Link>
          </div>
        </div>
        <div key="main menu 4" className="dropdown avatar-btn">
          <button className="dropbtn">
            <a onClick={onElementClick} href="/profile">
              <img
                className="avatar"
                src="/static/images/school.jpg"
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
            {isAuth && role === 'admin' && (
              <Link onClick={onElementClick} key="user link 4" to="/settings">
                Настройки сайта
              </Link>
            )}
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
