import React from 'react';
import PopupWithForm from '../components/PopupWithForm';


function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');


    function handleChangeName(evt) {
        setName(evt.target.value)
    }

    function handleChangeLink(evt) {
        setLink(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace(name, link);
    }


    return (
        <>
            <PopupWithForm name="add-card" title="Новое место" buttonText="Создать" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
                <input id="title-input" className="popup__input popup__input_js_card-name" onChange={handleChangeName} type="text" name="name"
                    placeholder="Название" minLength="2" maxLength="30" required />
                <span className="title-input-error popup__error"></span>
                <input id="link-input" className="popup__input popup__input_js_card-link" onChange={handleChangeLink} type="url" name="link"
                    placeholder="Ссылка на картинку" required />
                <span className="link-input-error popup__error"></span>
            </PopupWithForm>
        </>

    )
}

export default AddPlacePopup;