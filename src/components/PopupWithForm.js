import React from 'react';

function PopupWithForm(props) { 

   
    return (
        <>
            <section className={`popup popup_${props.name} ${props.isOpen && 'popup_open'}`}>
                <div className="popup__container">
                    <button className="popup__close" type="button" onClick={props.isClose}></button>
                    <h2 className="popup__title">{props.title}</h2>
                    <form className="popup__form" name={props.name} noValidate>
                        {props.children}                                           
                    </form>
                </div>
            </section>           
        </>
    );
}

export default PopupWithForm;