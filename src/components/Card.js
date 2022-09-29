import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `place__remove-button ${isOwn ? 'place__remove-button_visible' : ''}`
  );

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `place__like-button ${isLiked ? 'place__like-button_active' : ''}`
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <li className="place__card">
      <img className="place__photo" src={card.link} alt={card.name} onClick={handleClick} />
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick} aria-label="Удалить карточку"></button>
      <div className="place__description">
        <h2 className="place__header">{card.name}</h2>
        <div className="place__like-element">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} aria-label="Нравится"></button>
          <div className="place__like-number place__like-number_visible">{card.likes.length}</div>
        </div>
      </div>
    </li>
  )
}

export default Card;
