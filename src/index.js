import "./pages/index.css";

import { createCard, removeCard, likeCard } from "./scripts/card.js";
import { openPopup, closePopup, closeClick } from "./scripts/modal.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import { validationConfig } from "./constants.js";
import { handleSubmit } from "./scripts/utils.js";
import {
  updateAvatar,
  addNewCard,
  updateUserInfo,
  getInitialCards,
  getUserInfo,
} from "./scripts/api.js";

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

enableValidation(validationConfig);

function addCard(evt) {
  function makeRequest() {
    return addNewCard(addCardFormName.value, addCardFormUrl.value).then(
      (card) => {
        placesList.prepend(
          createCard(card, removeCard, likeCard, createImagePopup, card.owner._id)
        );
        closePopup(addCardPopup);
      }
    );
  }
  handleSubmit(makeRequest, evt);
}

function profileSubmit(evt) {
  function makeRequest() {
    return updateUserInfo(nameInput.value, descriptionInput.value).then(
      (data) => {
        profileName.textContent = data.name;
        profileDescription.textContent = data.about;
        closePopup(profilePopup);
      }
    );
  }
  handleSubmit(makeRequest, evt);
}

function avatarSubmit(evt) {
  function makeRequest() {
    return updateAvatar(avtarInput.value).then((user) => {
      profileImage.style.backgroundImage = `url('${user.avatar}')`;
      closePopup(avatarPopup);
    });
  }
  handleSubmit(makeRequest, evt);
}

function createImagePopup(item) {
  popupCaption.textContent = item.name;
  image.src = item.link;
  image.alt = item.name;
  openPopup(imagePopup);
}

Promise.all([getUserInfo(), getInitialCards()])
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

profilePopup.addEventListener("mousedown", closeClick);
profileForm.addEventListener("submit", profileSubmit);
addCardPopup.addEventListener("mousedown", closeClick);
addCardForm.addEventListener("submit", addCard);
avatarPopup.addEventListener("mousedown", closeClick);
avatarForm.addEventListener("submit", avatarSubmit);
imagePopup.addEventListener("click", closeClick);
