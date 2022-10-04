import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef()

  function handleChangeAvatar(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen])

  return (
    <PopupWithForm
      name='edit-avatar'
      title='Обновить аватар'
      buttonText='Сохранить'
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleChangeAvatar}>
      <fieldset className="profile-form__input-container">
        <input
          type="url"
          name="avatar"
          id="avatar-input"
          placeholder="Ссылка на фото"
          className="profile-form__input profile-form__input_type_avatar"
          required
          ref={avatarRef} />
        <span className="avatar-input-error profile-form__input-error"></span>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
