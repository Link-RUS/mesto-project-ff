import "./pages/index.css";

import { createCard, removeCard, likeCard } from "./scripts/card.js";
import { initialCards } from "./scripts/cards.js";
import { openPopup, closePopup, closeClick } from "./scripts/modal.js";

const placesList = document.querySelector(".places__list");

const profilePopup = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileForm = profilePopup.querySelector(".popup__form");
const nameInput = profileForm.querySelector(".popup__input_type_name");
const descriptionInput = profileForm.querySelector(
  ".popup__input_type_description"
);
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const addButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardForm = addCardPopup.querySelector(".popup__form");
const addCardFormName = addCardForm.querySelector(
  ".popup__input_type_card-name"
);
const addCardFormUrl = addCardForm.querySelector(".popup__input_type_url");

initialCards.forEach((card) => {
  placesList.append(createCard(card, removeCard, likeCard, createImagePopup));
});

profileEditButton.addEventListener("click", (evt) => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(profilePopup);
});

addButton.addEventListener("click", (evt) => {
  openPopup(addCardPopup);
});

profilePopup.addEventListener("click", closeClick);
profileForm.addEventListener("submit", profileSubmit);
addCardPopup.addEventListener("click", closeClick);
addCardForm.addEventListener("submit", addCard);

function addCard(evt) {
  evt.preventDefault();
  const card = {};
  card.name = addCardFormName.value;
  card.link = addCardFormUrl.value;
  placesList.prepend(createCard(card, removeCard, likeCard, createImagePopup));
  document.forms["new-place"].reset();
  closePopup(addCardPopup);
}

function profileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(profilePopup);
}

function createImagePopup(evt) {
  const imagePopup = document.querySelector(".popup_type_image");
  const image = imagePopup.querySelector(".popup__image");
  const popupCaption = document.querySelector(".popup__caption");
  popupCaption.textContent = evt.target
    .closest(".card")
    .querySelector(".card__title").textContent;
  image.src = evt.target.src;
  image.alt = evt.target.alt;
  imagePopup.addEventListener("click", closeClick);
  openPopup(imagePopup);
}
