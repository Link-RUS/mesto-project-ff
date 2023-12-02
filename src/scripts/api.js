import { TOKEN, BASE_URL } from "../constants.js";

function getUserInfo() {
  return get("users/me");
}

function getInitialCards() {
  return get("cards");
}

function updateUserInfo(name, description) {
  return post(
    "users/me",
    { name: `${name}`, about: `${description}` },
    "PATCH"
  );
}

function addNewCard(name, link) {
  return post("cards", {
    name: `${name}`,
    link: `${link}`,
  });
}

function putLike(id) {
  return post(`cards/likes/${id}`, [], "PUT");
}

function deleteLike(id) {
  return post(`cards/likes/${id}`, [], "DELETE");
}

function deleteCard(id) {
  return post(`cards/${id}`, [], "DELETE");
}

function updateAvatar(avatar) {
  return post("users/me/avatar", { avatar: `${avatar}` }, "PATCH");
}

function get(uri, query = {}, isHead = false) {
  const targetUrl = BASE_URL + uri;

  return fetch(targetUrl, {
    method: isHead ? "HEAD" : "GET",
    headers: {
      authorization: TOKEN,
    },
  }).then(handleResponse);
}

function post(uri, data, method = "POST") {
  const targetUrl = BASE_URL + uri;
  const body = JSON.stringify(data);
  return fetch(targetUrl, {
    method,
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
    body,
  }).then(handleResponse);
}

function handleResponse(response) {
  if (response.ok) return response.json();
  return Promise.reject(`Error: ${response.status}`);
}

export {
  get,
  post,
  updateAvatar,
  deleteCard,
  deleteLike,
  putLike,
  addNewCard,
  updateUserInfo,
  getInitialCards,
  getUserInfo,
};
