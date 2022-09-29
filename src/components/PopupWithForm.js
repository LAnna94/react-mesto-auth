function PopupWithForm({ isOpen, onClose, name, title, children, buttonText, onSubmit }) {
  return (
    <div className={`popup ${isOpen && 'popup_opened'}`} id={name}>
      <div className="popup__container">
        <button onClick={onClose} type="button" className="popup__close-button" aria-label="Закрыть всплывающее окно"></button>
        <h2 className="popup__title">{title}</h2>
        <form onSubmit={onSubmit} name={name} className="profile-form" noValidate>
          {children}
          <button type="submit" className="profile-form__save-button">{buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
