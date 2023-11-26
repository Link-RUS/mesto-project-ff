const BASE_URL = "https://mesto.nomoreparties.co/v1/wff-cohort-1/";
const BASE_OPTIONS = {
  headers: {
    authorization: "95326bff-eafb-4149-8ddc-943453bbce44",
  },
};

function get(uri, query = {}, isHead = false) {
  const targetUrl = BASE_URL + uri;

  return fetch(targetUrl, {
    method: isHead ? "HEAD" : "GET",
    ...BASE_OPTIONS,
  }).then(hendleResponse);
}

function post(uri, data, method = "POST") {
  const targetUrl = BASE_URL + uri;
  const [headers, ...otherOptions] = BASE_OPTIONS;
  const body = JSON.stringify(data);
  return fetch(targetUrl, {
    method,
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    ...otherOptions,
    body,
  }).then(hendleResponse);
}

function hendleResponse(response) {
  if (response.ok) return response.json();
  return Promise.reject(`Error: ${res.status}`);
}

export { get, post };
