function InfoTooltip() {
  return (
    <div className="popup popup_opened" id="info-tip">
      <div className="popup__container popup__info-tip-container">
        <button type="button" className="popup__close-button" aria-label="Закрыть всплывающее окно"></button>
        <img src="../images/failure.png" className="popup__info-tip-picture" />
        <p className="popup__info-tip-capture">Что-то пошло не так!
          Попробуйте ещё раз.</p>
      </div>
    </div>
  )
}

export default InfoTooltip
