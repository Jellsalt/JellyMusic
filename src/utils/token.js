function setToken(token) {
  localStorage.setItem("token_key", token);
}

function getToken() {
  return localStorage.getItem("token_key");
}

function removeToken() {
  localStorage.removeItem("token_key");
}

export { setToken, getToken, removeToken };
