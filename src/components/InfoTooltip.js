function InfoTooltip( {isOpen, onClose, infoMessage} ) {
  return (
    <div className={`popup ${isOpen && 'popup_opened'}`} id="info-tip">
      <div className="popup__container popup__info-tip-container">
        <button type="button" onClick={onClose} className="popup__close-button" aria-label="Закрыть всплывающее окно"></button>
        <img src={infoMessage.image} alt={infoMessage.message} className="popup__info-tip-picture" />
        <p className="popup__info-tip-capture">{infoMessage.message}</p>
      </div>
    </div>
  )
}

export default InfoTooltip
