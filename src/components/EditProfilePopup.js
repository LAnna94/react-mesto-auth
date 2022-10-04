import { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('')
  const currentUser = useContext(CurrentUserContext)


  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name='edit-profile'
      title='Редактировать профиль'
      buttonText='Сохранить'
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}>
      <fieldset className="profile-form__input-container">
        <input
          type="text"
          name="name"
          id="name-input"
          className="profile-form__input profile-form__input_type_name"
          minLength="2"
          maxLength="40"
          required
          value={name || ''}
          onChange={handleChangeName} />
        <span className="name-input-error profile-form__input-error"></span>
        <input
          type="text"
          name="about"
          id="description-input"
          className="profile-form__input profile-form__input_type_description"
          minLength="2"
          maxLength="200"
          required
          value={description || ''}
          onChange={handleChangeDescription} />
        <span className="description-input-error profile-form__input-error"></span>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
