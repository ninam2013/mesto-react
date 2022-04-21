import React from 'react';
import api from '../utils/Api';
import Card from '../components/Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';    //1+


function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, setCards }) {      //1+ cards
  // const [userName, setUserName] = React.useState('');
  // const [userDescription, setUserDescription] = React.useState('');
  // const [userAvatar, setUserAvatar] = React.useState('');
  // const [cards, setCards] = React.useState([]);
  const currentUser = React.useContext(CurrentUserContext);     //1+


  function handleCardLike(card) {       //2+
   
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    const request = isLiked ?
      api.deleteLike(card._id, !isLiked) :
      api.addLike(card._id, !isLiked)
    request.then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => {
        console.log(`${err}`);
      });
  }

  function handleCardDelete(card) {    //2 
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }

  return (
    <main className="main">

      <section className="profile">
        <div className="profile__info">
          <button className="profile__button-avatar" onClick={onEditAvatar}></button>
          {currentUser.avatar && (<img className="profile__image" src={currentUser.avatar} alt="аватар" />)}    {/*  1  */}
          <div className="profile__desc">
            <div className="profile__name">
              <h1 className="profile__title">{currentUser.name}</h1>      {/*  1  */}
              <button className="profile__button" type="button" onClick={onEditProfile}></button>
            </div>
            <p className="profile__text">{currentUser.about}</p>   {/*  1  */}
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>

      <section className="places">
        <ul className="places__container">

          {
            cards.map(item => (       //1+ cards
              <Card key={item._id}
                name={item.name}
                link={item.link}
                likes={item.likes}
                card={item}
                onCardClick={onCardClick}
                currentUser={currentUser}
                onCardLike={handleCardLike}     //2+
                onCardDelete={handleCardDelete} //2
              />
            ))
          }

        </ul>
      </section>
    </main>
  );
}

export default Main;