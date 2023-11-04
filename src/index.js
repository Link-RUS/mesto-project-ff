import "./pages/index.css";

import { createCard, removeCard } from "./scripts/card.js";
import { initialCards } from "./scripts/cards.js";

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

const addCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

initialCards.forEach((card) => {
  placesList.append(createCard(card, removeCard));
});

profileEditButton.addEventListener("click", (evt) => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(profilePopup);
});

function openPopup(element) {
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEsc);
}

function closeEsc(evt) {
  if (evt.key === "Escape")
    closePopup(document.querySelector(".popup_is-opened"));
}

function closePopup(element) {
  document.removeEventListener("keydown", closeEsc);
  element.classList.remove("popup_is-opened");
}

function closeClick(evt) {
  if (evt.target.classList.contains("popup__close"))
    closePopup(evt.currentTarget);
  if (evt.target.classList.contains("popup"))
    closePopup(evt.currentTarget); 
}

profilePopup.addEventListener('click', closeClick);
profileForm.addEventListener('submit', profileSubmit);

function profileSubmit(evt){
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(profilePopup);
}