import React from 'react';
import PopupWithForm from '../components/PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(evt) {
    setName(evt.target.value)
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });

  }

  return (
    <>
      <PopupWithForm name="type-edit" title="Редактировать профиль" buttonText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
        <input id="name-input" className="popup__input popup__input_js_name" value={name || ""} onChange={handleChangeName} type="text" name="name" placeholder="Имя"
          minLength="2" maxLength="40" required />
        <span className="name-input-error popup__error"></span>
        <input id="job-input" className="popup__input popup__input_js_job" value={description || ""} onChange={handleChangeDescription} type="text" name="job" placeholder="О себе"
          minLength="2" maxLength="200" required />
        <span className="job-input-error popup__error"></span>
      </PopupWithForm>

    </>

  )
}

export default EditProfilePopup;