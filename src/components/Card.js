import React from 'react';

function Card({ name, link, likes, card, onCardClick }) {        
  
  function handleClick() {
    onCardClick(card);
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
            <button type="button" className="place__button"></button>
            <span className="place__count">{likes.length}</span>
          </div>
          <button type="button" className="place__basket"></button>
        </div>
      </li>
    </div>
  )
}

export default Card;