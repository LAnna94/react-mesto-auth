import { useRef, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const placeUrlRef = useRef();
  const placeNameRef = useRef()

  function handleCardSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      link: placeUrlRef.current.value,
      name: placeNameRef.current.value
    })

  }

  useEffect(() => {
    placeUrlRef.current.value = '';
    placeNameRef.current.value = '';
  }, [isOpen])

  return (
    <PopupWithForm
      name='add-card'
      title='Новое место'
      buttonText='Создать'
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleCardSubmit}>
      <fieldset className="profile-form__input-container">
        <input
          type="text"
          name="name"
          id="placename-input"
          placeholder="Название"
          className="profile-form__input profile-form__input_type_placename"
          minLength="2"
          maxLength="30" required
          ref={placeNameRef} />
        <span className="placename-input-error profile-form__input-error"></span>
        <input
          type="url"
          name="link"
          id="link-input"
          placeholder="Ссылка на картинку"
          className="profile-form__input profile-form__input_type_link"
          required
          ref={placeUrlRef} />
        <span className="link-input-error profile-form__input-error"></span>
      </fieldset>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
