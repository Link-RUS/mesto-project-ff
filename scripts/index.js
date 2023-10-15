const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
const cards = [];

function createCard(item, delCard) {
  const card = cardTemplate.querySelector(".places__item").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  card.querySelector(".card__image").src = item.link;
  card.querySelector(".card__image").alt = item.name;
  card.querySelector(".card__title").textContent = item.name;
  deleteButton.addEventListener("click", (evt) => delCard(evt));
  return card;
}

function removeCard(evt) {
  evt.target.closest(".places__item").remove();
}

for (let i = 0; i < initialCards.length; i++) {
  cards[i] = createCard(initialCards[i], removeCard);
  placesList.append(cards[i]);
}
