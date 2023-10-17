const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function createCard(item, delCard) {
  const card = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  cardImage.src = item.link;
  cardImage.alt = item.name;
  card.querySelector(".card__title").textContent = item.name;
  card
    .querySelector(".card__delete-button")
    .addEventListener("click", (evt) => delCard(evt));
  return card;
}

function removeCard(evt) {
  evt.target.closest(".places__item").remove();
}

initialCards.forEach((card) => {
  placesList.append(createCard(card, removeCard));
});
