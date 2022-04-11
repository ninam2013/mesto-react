import React from 'react';
import '../index.css';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import PopupWithForm from '../components/PopupWithForm';
import ImagePopup from '../components/ImagePopup';



function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});     

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);    
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)   
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

  return (

    <div className="body">
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}    
        />
     <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} isClose={closeAllPopups}>
            <input id="link-input-image" className="popup__input popup__input_js_card-link" type="url" name="link"
              placeholder="Ссылка на картинку" required />
            <span className="link-input-image-error popup__error"></span>
            <button type="submit" className="popup__button popup__button_js_card-submit margin-top">Сохранить</button>
          </PopupWithForm>

       <PopupWithForm name="type-edit" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} isClose={closeAllPopups}>
            <input id="name-input" className="popup__input popup__input_js_name" type="text" name="name" placeholder="Имя"
              minLength="2" maxLength="40" required />
            <span className="name-input-error popup__error"></span>
            <input id="job-input" className="popup__input popup__input_js_job" type="text" name="job" placeholder="О себе"
              minLength="2" maxLength="200" required />
            <span className="job-input-error popup__error"></span>
            <button type="submit" className="popup__button">Сохранить</button>
          </PopupWithForm>

          <PopupWithForm name="add-card" title="Новое место" isOpen={isAddPlacePopupOpen} isClose={closeAllPopups}>
            <input id="title-input" className="popup__input popup__input_js_card-name" type="text" name="name"
              placeholder="Название" minLength="2" maxLength="30" required />
            <span className="title-input-error popup__error"></span>
            <input id="link-input" className="popup__input popup__input_js_card-link" type="url" name="link"
              placeholder="Ссылка на картинку" required />
            <span className="link-input-error popup__error"></span>
            <button type="submit" className="popup__button popup__button_js_card-submit" data-loading="Создание...">Создать</button>
          </PopupWithForm>

          <PopupWithForm name="delete-confirm" title="Вы уверены?">
            <button type="submit" className="popup__button popup__button_js_card-submit margin-top">Да</button>
          </PopupWithForm>

           <ImagePopup card={selectedCard} onClose={closeAllPopups} />     

        <Footer />
      </div>
    </div>
  );
}

export default App;
