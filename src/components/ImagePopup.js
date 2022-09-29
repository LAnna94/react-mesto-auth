function ImagePopup({ isOpen, onClose, card }) {
  return (
    <div className={`popup ${isOpen && 'popup_opened'}`} id="big-picture">
      <div className="popup__big-picture-container">
        <button onClick={onClose} type="button" className="popup__close-button" aria-label="Закрыть всплывающее окно"></button>
        <img className="popup__big-picture-photo" src={card.link} alt={card.name} />
        <p className="popup__big-picture-capture">{card.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup
