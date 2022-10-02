import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as auth from '../utils/auth.js';
import errImage from '../images/errImage.png'

function Login({ handleLogin, infoMessage, infoPopup }) {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (evt) => {
    setEmail(evt.target.value);
  }

  const handlePassword = (evt) => {
    setPassword(evt.target.value);
  }

  const onLogin = (evt) => {
    evt.preventDefault();

    if (!email || !password) {
      return;
    }

    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          setEmail('');
          setPassword('');
          handleLogin();
          history.push('/')
        }
      })
      .catch((err) => {
        infoPopup()
        infoMessage({
          image: errImage,
          message: 'Что-то пошло не так! Попробуйте ещё раз.'
        })
        console.log(err);
      })
  }

  return (
    <div className="register">
      <h2 className="register__title">Вход</h2>
      <form name="register" onSubmit={onLogin} className="profile-form auth-form" noValidate>
        <fieldset className="profile-form__input-container auth-form__input-container">
          <input
            type="text"
            name="email"
            id="email-input"
            placeholder="Email"
            className="auth-form__input auth-form__input_type_email"
            minLength="2"
            maxLength="30"
            required
            value={email}
            onChange={handleEmail}
          />
          <span className="email-input-error profile-form__input-error"></span>
          <input
            type="password"
            name="password"
            id="password-input"
            placeholder="Пароль"
            className="auth-form__input auth-form__input_type_password"
            required
            value={password}
            onChange={handlePassword}
          />
          <span className="password-input-error profile-form__input-error"></span>
        </fieldset>
        <button type="submit" className="profile-form__save-button auth-form__save-button">Войти</button>
      </form>
    </div>
  )
}

export default Login;
