import { post } from "./api.js";

function createCard(item, delCard, likeCard, createImagePopup, userId = 0) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const likeCounter = card.querySelector(".card__like-counter");
  const cardDeleteBtn = card.querySelector(".card__delete-button");
  const cardLike = card.querySelector(".card__like-button");
  cardImage.src = item.link;
  cardImage.alt = item.name;
  likeCounter.textContent = item.likes.length;
  card.querySelector(".card__title").textContent = item.name;
  if (userId === item.owner._id || userId === 0) cardDeleteBtn.style.display = "block";
  else cardDeleteBtn.style.display = "none";


  if (isLike(item, userId))
    cardLike.classList.add("card__like-button_is-active");

  cardDeleteBtn.addEventListener("click", (evt) => delCard(evt, item));

  cardLike.addEventListener("click", (evt) =>
    likeCard(evt, item, userId, likeCounter)
  );

  cardImage.addEventListener("click", () => createImagePopup(item));

  return card;
}

function removeCard(evt, item) {
  post(`cards/${item._id}`, [], "DELETE");
  evt.target.closest(".places__item").remove();
}

function likeCard(evt, item, userId, likeCounter) {
  if (!isLike(item, userId))
    post(`cards/likes/${item._id}`, [], "PUT").then((item) => {
      likeCounter.textContent = item.likes.length;
      evt.target.classList.add("card__like-button_is-active");
    });
  else
    post(`cards/likes/${item._id}`, [], "DELETE").then((item) => {
      likeCounter.textContent = item.likes.length;
      evt.target.classList.remove("card__like-button_is-active");
    });
}

function isLike(item, userId) {
  return item.likes.some((like) => {
    return like._id === userId;
  });
}

export { createCard, removeCard, likeCard };
