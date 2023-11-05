function createCard(item, delCard, likeCard, createImagePopup) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  cardImage.src = item.link;
  cardImage.alt = item.name;
  card.querySelector(".card__title").textContent = item.name;
  card
    .querySelector(".card__delete-button")
    .addEventListener("click", (evt) => delCard(evt));
  card
    .querySelector(".card__like-button")
    .addEventListener("click", (evt) => likeCard(evt));
  cardImage.addEventListener("click", createImagePopup);
  return card;
}

function removeCard(evt) {
  evt.target.closest(".places__item").remove();
}

function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { createCard, removeCard, likeCard };
