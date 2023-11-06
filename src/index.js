import "./pages/index.css";

import { createCard, removeCard, likeCard } from "./scripts/card.js";
import { initialCards } from "./scripts/cards.js";
import { openPopup, closePopup, closeClick } from "./scripts/modal.js";

const placesList = document.querySelector(".places__list");

const profilePopup = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileForm = document.forms["edit-profile"];
const nameInput = profileForm.elements.name;
const descriptionInput = profileForm.elements.description;
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const addButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardForm = document.forms["new-place"];
const addCardFormName = addCardForm.elements["place-name"];
const addCardFormUrl = addCardForm.elements.link;

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

profilePopup.addEventListener("mousedown", closeClick);
profileForm.addEventListener("submit", profileSubmit);
addCardPopup.addEventListener("mousedown", closeClick);
addCardForm.addEventListener("submit", addCard);

function addCard(evt) {
  evt.preventDefault();
  placesList.prepend(
    createCard(
      { name: addCardFormName.value, link: addCardFormUrl.value },
      removeCard,
      likeCard,
      createImagePopup
    )
  );
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