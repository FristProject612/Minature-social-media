
export function storeAccessToken(token) {
  localStorage.setItem('accessToken', token);
}

export function getAccessToken() {
  const accessToken = localStorage.getItem('accessToken');
  return accessToken;
}

export function storeRefreshToken(token) {
  localStorage.setItem('refreshToken', token);
}

export function getRefreshToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  return refreshToken;
}

export function storeUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUser() {
  const user = JSON.parse(localStorage.getItem('user'));
  return user;
}