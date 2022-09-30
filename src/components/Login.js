import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as auth from '../utils/auth.js'

function Login({ handleLogin }) {
  const history = useHistory();
  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: value
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!state.email || !state.password) {
      return
    }

    auth.authorize(state.email, state.password)
      .then((data) => {
        if (data.token) {
          setState({
            email: '',
            password: ''
          })
          handleLogin()
          history.push('/')
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="register">
      <h2 className="register__title">Вход</h2>
      <form name="register" onSubmit={handleSubmit} className="profile-form auth-form" noValidate>
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
            value={state.email}
            onChange={handleChange}
          />
          <span className="email-input-error profile-form__input-error"></span>
          <input
            type="password"
            name="password"
            id="password-input"
            placeholder="Пароль"
            className="auth-form__input auth-form__input_type_password"
            required
            value={state.password}
            onChange={handleChange}
          />
          <span className="password-input-error profile-form__input-error"></span>
        </fieldset>
        <button type="submit" className="profile-form__save-button auth-form__save-button">Войти</button>
      </form>
    </div>
  )
}

export default Login;
