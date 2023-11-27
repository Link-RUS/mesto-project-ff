import "./pages/index.css";

import { createCard, removeCard, likeCard } from "./scripts/card.js";
import { openPopup, closePopup, closeClick } from "./scripts/modal.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import { get, post } from "./scripts/api.js";

const placesList = document.querySelector(".places__list");

const profilePopup = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileForm = document.forms["edit-profile"];
const nameInput = profileForm.elements.name;
const descriptionInput = profileForm.elements.description;
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const addButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardForm = document.forms["new-place"];
const addCardFormName = addCardForm.elements["place-name"];
const addCardFormUrl = addCardForm.elements.link;

const imagePopup = document.querySelector(".popup_type_image");
const image = imagePopup.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

const avatarEditButton = document.querySelector(".profile__avatar");
const avatarPopup = document.querySelector(".popup_type_avatar");
const avatarForm = document.forms["new-avatar"];
const avtarInput = avatarForm.elements.avatar;

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(profilePopup);
  clearValidation(profilePopup, validationConfig);
});

addButton.addEventListener("click", () => {
  openPopup(addCardPopup);
  clearValidation(addCardForm, validationConfig);
});

avatarEditButton.addEventListener("click", () => {
  openPopup(avatarPopup);
  clearValidation(avatarPopup, validationConfig);
});

function addCard(evt) {
  evt.preventDefault();
  const saveButton = addCardForm.querySelector(".popup__button");
  saveButton.textContent = "Сохранить…"
  saveButton.classList.add(validationConfig.inactiveButtonClass);
  post("cards", {
    name: addCardFormName.value,
    link: addCardFormUrl.value,
  })
    .then((card) => {
      placesList.prepend(
        createCard(card, removeCard, likeCard, createImagePopup)
      );
    })
    .catch((err) => console.error("Ошибка добавления карточки:", err))
    .finally(() => {
      addCardForm.reset();
      closePopup(addCardPopup);
      saveButton.textContent = "Сохранить"
      saveButton.classList.remove(validationConfig.inactiveButtonClass);
    });
}

function profileSubmit(evt) {
  evt.preventDefault();
  const saveButton = profileForm.querySelector(".popup__button");
  saveButton.textContent = "Сохранить…"
  saveButton.classList.add(validationConfig.inactiveButtonClass);
  post(
    "users/me",
    { name: nameInput.value, about: descriptionInput.value },
    "PATCH"
  )
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
    })
    .catch((err) =>
      console.error("Ошибка обновления информации о пользователе:", err)
    )
    .finally(() => {
      closePopup(profilePopup);
      saveButton.textContent = "Сохранить"
      saveButton.classList.remove(validationConfig.inactiveButtonClass);
    });
}

function avatarSubmit(evt) {
  evt.preventDefault();
  const saveButton = avatarForm.querySelector(".popup__button");
  saveButton.textContent = "Сохранить…"
  saveButton.classList.add(validationConfig.inactiveButtonClass);
  post("users/me/avatar", { avatar: avtarInput.value }, "PATCH")
    .then((user) => {
      profileImage.style.backgroundImage = `url('${user.avatar}')`;
    })
    .catch((err) => console.error("Ошибка обновления аватара:", err))
    .finally(() => {
      closePopup(avatarPopup);
      saveButton.textContent = "Сохранить"
      saveButton.classList.remove(validationConfig.inactiveButtonClass);
    });
}

function createImagePopup(item) {
  popupCaption.textContent = item.name;
  image.src = item.link;
  image.alt = item.name;
  openPopup(imagePopup);
}

profilePopup.addEventListener("mousedown", closeClick);
profileForm.addEventListener("submit", profileSubmit);
addCardPopup.addEventListener("mousedown", closeClick);
addCardForm.addEventListener("submit", addCard);
avatarPopup.addEventListener("mousedown", closeClick);
avatarForm.addEventListener("submit", avatarSubmit);
imagePopup.addEventListener("click", closeClick);

Promise.all([get("users/me"), get("cards")])
  .then(([user, cards]) => {
    profileName.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style.backgroundImage = `url('${user.avatar}')`;

    cards.forEach((card) => {
      placesList.append(
        createCard(card, removeCard, likeCard, createImagePopup, user._id)
      );
    });
  })
  .catch((err) =>
    console.error("Ошибка получения данных пользователя и карточек:", err)
  );
