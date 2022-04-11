import React from 'react';

function PopupWithForm(props) { 

    const {name, title,  buttonText, isOpen, onClose} = props;
   
    return (
        <>
            <section className={`popup popup_${name} ${isOpen && 'popup_open'}`}>
                <div className="popup__container">
                    <button className="popup__close" type="button" onClick={onClose}></button>
                    <h2 className="popup__title">{title}</h2>
                    <form className="popup__form" name={name} noValidate>
                        {props.children} 
                        <button type="submit" className="popup__button popup__button_js_card-submit margin-top">{buttonText}</button>                                          
                    </form>
                </div>
            </section>           
        </>
    );
}

export default PopupWithForm;