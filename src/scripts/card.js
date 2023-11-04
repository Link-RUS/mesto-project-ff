
function createCard(item, delCard) {
  const cardTemplate = document.querySelector("#card-template").content;
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

export {createCard, removeCard}