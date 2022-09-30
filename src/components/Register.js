import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import * as auth from '../utils/auth.js'

function Register() {
  const history = useHistory();
  const [state, setState] = useState({
    email: '',
    password: ''
  })

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = state;
    auth.register(email, password)
      .then((res) => {
        if (res) {
          setState({
            ...state,
            message: 'успех'
          })
          history.push('/sign-in')
        } else {
          setState({
            ...state,
            message: 'что-то пошло не так'
          })
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
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
            onChange={handleChange} />
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
        <button type="submit" className="profile-form__save-button auth-form__save-button">Зарегистрироваться</button>
      </form>
      <Link to="/sign-in" className="auth-form__log-in-link">Уже зарегистрированы? Войти</Link>
    </div>
  )
}

export default Register
