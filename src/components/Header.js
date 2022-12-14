import logo from '../images/logo.svg';
import { Route, Switch, Link } from 'react-router-dom'

function Header({ onSignOut, email }) {
  return (
    <header className="header">
      <img src={logo} alt="лого" className="header__logo" />

      <Switch>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__nav-button">
            Войти
          </Link>
        </Route>

        <Route path="/sign-in">
          <Link to="/sign-up" className="header__nav-button">
            Регистрация
          </Link>
        </Route>

        <Route exact path="/">
          <ul className="header__navbar">
            <li>
              <div className="header__nav-item">{email}</div>
            </li>
            <li>
              <button onClick={onSignOut} className="header__nav-button">
                Выйти
              </button>
            </li>
          </ul>
        </Route>
      </Switch>
    </header>


  )
}

export default Header;
