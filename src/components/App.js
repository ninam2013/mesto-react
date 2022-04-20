import React from 'react';
import '../index.css';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import PopupWithForm from '../components/PopupWithForm';
import EditProfilePopup from '../components/EditProfilePopup';    //3
import ImagePopup from '../components/ImagePopup';
import api from '../utils/Api'
import { CurrentUserContext } from '../contexts/CurrentUserContext';    //1+



function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});    //1+
  const [cards, setCards] = React.useState([]);    //1+

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCard()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => console.log(`${err}`));
  }, []);


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  };

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({})
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }


  function handleUpdateUser(currentUser) {        //3
    api.editProfile(currentUser)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(`${err}`));
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>        {/*  1+  */}
      <div className="body">
        <div className="page">
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            setCards={setCards}
          />
          {/* <EditProfilePopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />            

            <EditProfilePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />        */}

          <PopupWithForm name="avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} >
            <input id="link-input-image" className="popup__input popup__input_js_card-link" type="url" name="link"
              placeholder="Ссылка на картинку" required />
            <span className="link-input-image-error popup__error"></span>
          </PopupWithForm>

          {/* <PopupWithForm name="type-edit" title="Редактировать профиль" buttonText="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
            <input id="name-input" className="popup__input popup__input_js_name" type="text" name="name" placeholder="Имя"
              minLength="2" maxLength="40" required />
            <span className="name-input-error popup__error"></span>
            <input id="job-input" className="popup__input popup__input_js_job" type="text" name="job" placeholder="О себе"
              minLength="2" maxLength="200" required />
            <span className="job-input-error popup__error"></span>
          </PopupWithForm> */}

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />   {/*  3  */}
          <PopupWithForm name="add-card" title="Новое место" buttonText="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} >
            <input id="title-input" className="popup__input popup__input_js_card-name" type="text" name="name"
              placeholder="Название" minLength="2" maxLength="30" required />
            <span className="title-input-error popup__error"></span>
            <input id="link-input" className="popup__input popup__input_js_card-link" type="url" name="link"
              placeholder="Ссылка на картинку" required />
            <span className="link-input-error popup__error"></span>
          </PopupWithForm>

          <PopupWithForm name="delete-confirm" title="Вы уверены?" buttonText="Да">
          </PopupWithForm>


          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider >     //1+
  );
}

export default App;
