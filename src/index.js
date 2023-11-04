import './pages/index.css'

import {createCard, removeCard} from './scripts/card.js'
import {initialCards} from './scripts/cards.js'

const placesList = document.querySelector(".places__list");


initialCards.forEach((card) => {
  placesList.append(createCard(card, removeCard));
});