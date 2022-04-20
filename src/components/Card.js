import React from 'react';


function Card({ name, link, likes, card, onCardClick, currentUser, onCardLike, onCardDelete }) {
  const isOwn = card.owner._id === currentUser._id;                                       //1+
  const cardDeleteButtonClassName = (
    `place__basket ${isOwn ? 'place__basket_visible' : 'place__basket_hidden'}`   //1+
  );

  const isLiked = card.likes.some(i => i._id === currentUser._id);                      //1+  
  const cardLikeButtonClassName = (
    `place__button ${isLiked ? 'place__button_active' : 'place__button'}`   //1+
  );


  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {    //2+     
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <div className="place-template">
      <li className="place">
        <img className="place__image" src={link} alt={name} onClick={handleClick} />
        <div className="place__info">
          <div className="place__box-name">
            <h2 className="place__title">{name}</h2>
          </div>
          <div className="place__box-likes">
            <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
            <span className="place__count">{likes.length}</span>
          </div>
          <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
        </div>
      </li>
    </div>
  )
}

export default Card;