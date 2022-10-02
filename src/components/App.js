import { useState, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import * as auth from '../utils/auth.js';
import InfoTooltip from './InfoTooltip';


function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isPhotoPopupOpen, setIsPhotoPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const history = useHistory();
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false)
  const [infoMessage, setInfoMessage] = useState({
    image: '',
    message: ''
  });

  useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards()
    ])
      .then(([dataUserInfo, initialCardsData]) => {
        setCurrentUser(dataUserInfo)
        setCards(initialCardsData)
      })
      .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(err => console.log('Ошибка. Запрос не выполнен: ', err));
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleInfoPopup = () => {
    setIsInfoPopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsPhotoPopupOpen(true)
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsPhotoPopupOpen(false);
    setSelectedCard({});
    setIsInfoPopupOpen(false);
  }

  const handleUpdateUser = (userData) => {
    api.setProfileInfo(userData)
      .then((dataUserInfo) => {
        setCurrentUser(dataUserInfo);
      })
      .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))
      .finally(() => closeAllPopups())
  }

  const handleUpdateAvatar = (userAvatar) => {
    api.setNewAvatar(userAvatar)
      .then((userAvatar) => {
        setCurrentUser(userAvatar);
      })
      .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))
      .finally(() => closeAllPopups())
  }

  const handleAddPlaceSubmit = (cardData) => {
    api.addNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => console.log('Ошибка. Запрос не выполнен: ', err))
      .finally(() => closeAllPopups())
  }

  const handleLogin = () => {
    setLoggedIn(true)
  }

  const onLogin = () => {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) {
      return
    }

    auth.getContent(jwt)
      .then((res) => {
        if (res) {
          setEmail(res.data.email);
          handleLogin();
          history.push('/')
        }
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    onLogin()
  }, []);

  const onSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/sign-in')
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Header onSignOut={onSignOut} email={email} />
        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
          />

          <Route path='/sign-up'>
            <Register infoMessage={setInfoMessage} infoPopup={handleInfoPopup} />
          </Route>

          <Route path='/sign-in'>
            <Login handleLogin={handleLogin} infoMessage={setInfoMessage} infoPopup={handleInfoPopup} />
          </Route>

          <Route>
            {loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
          </Route>

        </Switch>

        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <PopupWithForm
          name='remove-card'
          title='Вы уверены?'
          buttonText='Да'>
          <fieldset className="profile-form__input-container">
          </fieldset>
        </PopupWithForm>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isPhotoPopupOpen} />

        <InfoTooltip
          isOpen={isInfoPopupOpen}
          onClose={closeAllPopups}
          infoMessage={infoMessage} />

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
