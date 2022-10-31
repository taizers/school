import './style.css';

export const SubMenu = () => {
  return (
    <div className="subnav" id="subnav">
      <a href="/home">Главная</a>
      <a href="/administration">Администрация</a>
      <a href="/teachers">Учительская</a>
      <a href="/news">Новости</a>
      <div className="dropdown">
        <button className="dropbtn">
          <a href="/schedule">
            <span className="dropbtn-text">Расписание</span>
            <span className="caret-down">&#x25BC;</span>
          </a>
        </button>
        <div className="dropdown-content">
          <a href="/schedule/rings">Расписание звонков</a>
          <a href="/schedule/vacations">Расписание четвертей и каникул</a>
          <a href="/schedule/class">Расписание классов</a>
        </div>
      </div>
      <div className="dropdown">
        <button className="dropbtn">
          <a href="/el-">
            <span className="dropbtn-text">Электронные обращения</span>
            <span className="caret-down">&#x25BC;</span>
          </a>
        </button>
        <div className="dropdown-content">
          <a href="/link/1">Физического лица</a>
          <a href="/link/2">
            Юридического лица и индивидуального предпринимателя
          </a>
          <a href="/link/3">
            Требования к оформлению и порядок рассмотрения обращений
          </a>
        </div>
      </div>
    </div>
  );
};
