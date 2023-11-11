
export function storeAccessToken(token) {
  sessionStorage.setItem('accessToken', token);
}

export function getAccessToken() {
  const accessToken = sessionStorage.getItem('accessToken');
  return accessToken;
}

export function storeRefreshToken(token) {
  sessionStorage.setItem('refreshToken', token);
}

export function getRefreshToken() {
  const refreshToken = sessionStorage.getItem('refreshToken');
  return refreshToken;
}

export function storeUser(user) {
  sessionStorage.setItem('user', JSON.stringify(user));
}

export function getUser() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  return user;
}