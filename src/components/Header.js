import logo from '../images/logo.svg';
import { Route, Switch, Link } from 'react-router-dom'

function Header({ children }) {
  return (
    <header className="header">
      <img src={logo} alt="лого" className="header__logo" />

      <Switch>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__nav-link">
            Войти
          </Link>
        </Route>

        <Route path="/sign-in">
          <Link to="/sign-up" className="header__nav-link">
            Регистрация
          </Link>
        </Route>

        <Route exact path="/">
          <Link to="/sign-in" className="header__nav-link">
            Выйти
          </Link>
        </Route>
      </Switch>
    </header>


  )
}

export default Header;
