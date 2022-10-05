import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import * as auth from '../utils/auth.js'
import successfully from '../images/successfully.png';
import errImage from '../images/errImage.png'

function Register({ infoPopup, infoMessage }) {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (evt) => {
    setEmail(evt.target.value);
  }

  const handlePassword = (evt) => {
    setPassword(evt.target.value);
  }

  const onRegister = (e) => {
    e.preventDefault();

    auth.register(email, password)
      .then((res) => {
          infoPopup();
          infoMessage({
            image: successfully,
            message: 'Вы успешно зарегистрировались!'
          })
          history.push('/sign-in')
      })
      .catch((err) => {
        infoPopup();
        infoPopup();
        infoMessage({
          image: errImage,
          message: 'Что-то пошло не так! Попробуйте ещё раз.'
        })
        console.log(err)})
  }

  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form name="register" onSubmit={onRegister} className="profile-form auth-form" noValidate>
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
            onChange={handleEmail} />
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
        <button type="submit" className="profile-form__save-button auth-form__save-button">Зарегистрироваться</button>
      </form>
      <Link to="/sign-in" className="auth-form__log-in-link">Уже зарегистрированы? Войти</Link>
    </div>
  )
}

export default Register
