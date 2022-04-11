import React, { useEffect } from 'react';
import api from '../utils/Api'
import Card from '../components/Card';

function Main(props) {
  const { onEditAvatar, onEditProfile, onAddPlace, onCardClick } = props;
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);




  useEffect(() => {
    api.getProfile()
      .then((profile) => {
        setUserName(profile.name);
        setUserDescription(profile.about);
        setUserAvatar(profile.avatar);
      })
      .catch((err) => {
        console.log(`${err} при загрузке данных с сервера`);
      });

    const handleCardsData = () => {
      api.getInitialCard()
        .then((cards) => {

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
    }
    handleCardsData()
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