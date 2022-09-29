import { Link } from 'react-router-dom';
import { useState } from 'react';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(evt) {
    setEmail(evt.target.value)
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value)
  }

  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form name="register" className="profile-form auth-form" noValidate>
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
            onChange={handleChangeEmail} />
          <span className="email-input-error profile-form__input-error"></span>
          <input
            type="password"
            name="password"
            id="password-input"
            placeholder="Пароль"
            className="auth-form__input auth-form__input_type_password"
            required
            value={password}
            onChange={handleChangePassword}
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
