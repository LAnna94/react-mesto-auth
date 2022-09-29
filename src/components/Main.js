import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext)

  return (
    <main className="content">
      <section className="profile">
        <img src={currentUser.avatar} alt="Аватар" className="profile__avatar" />
        <button onClick={onEditAvatar} type="button" className="profile__edit-avatar" aria-label="Редактировать фото профиля"></button>
        <div className="profile__info">
          <div className="profile__header">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button onClick={onEditProfile} type="button" className="profile__button-edit-profile" aria-label="Редактировать профиль"></button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button onClick={onAddPlace} type="button" className="profile__add-button" aria-label="Добавить карточку"></button>
      </section>
      <section className="places">
        <ul className="place">
          {cards.map((card) => (<Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />))}
        </ul>
      </section>
    </main>
  )
}

export default Main;
