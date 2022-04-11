import React, { useEffect } from 'react';
import api from '../utils/Api'
import Card from '../components/Card';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);


  useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCard()])
      .then(([profile, cards]) => {
        setUserName(profile.name);
        setUserDescription(profile.about);
        setUserAvatar(profile.avatar);
        const cardsData = cards.map(item => ({
          name: item.name,
          link: item.link,
          likes: item.likes,
          id: item._id
        }));
        setCards(cardsData)
      })
      .catch((err) => {
        console.log(`${err} при загрузке данных с сервера`);
      });

  }, [])


  return (
    <main className="main">

      <section className="profile">
        <div className="profile__info">
          <button className="profile__button-avatar" onClick={onEditAvatar}></button>
          {userAvatar && (<img className="profile__image" src={userAvatar} alt="аватар" />)}
          <div className="profile__desc">
            <div className="profile__name">
              <h1 className="profile__title">{userName}</h1>
              <button className="profile__button" type="button" onClick={onEditProfile}></button>
            </div>
            <p className="profile__text">{userDescription}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>

      <section className="places">
        <ul className="places__container">

          {
            cards.map(item => (
              <Card key={item.id} name={item.name} link={item.link} likes={item.likes} card={item} onCardClick={onCardClick} />
            ))
          }

        </ul>
      </section>
    </main>
  );
}

export default Main;