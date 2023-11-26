function openPopup(element) {
  setTimeout(() => {
    element.classList.add("popup_is-opened");
  }, 1);
  element.classList.add("popup_is-animated");

  document.addEventListener("keydown", closeEsc);
}

function closeEsc(evt) {
  if (evt.key === "Escape")
    closePopup(document.querySelector(".popup_is-opened"));
}

function closePopup(element) {
  document.removeEventListener("keydown", closeEsc);
  setTimeout(() => {
    element.classList.remove("popup_is-animated");
  }, 600);
  element.classList.remove("popup_is-opened");
}

function closeClick(evt) {
  if (evt.target.classList.contains("popup__close"))
    closePopup(evt.currentTarget);
  if (evt.target.classList.contains("popup")) closePopup(evt.currentTarget);
}

export { openPopup, closePopup, closeClick };