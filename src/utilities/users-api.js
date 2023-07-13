import sendRequest from './send-request';
const BASE_URL = '/api/users';
const LOGIN = '/login'
const CHECK_TOKEN = '/check-token'

export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}${LOGIN}`, 'POST', credentials);
}

export function checkToken() {
  return sendRequest(`${BASE_URL}${CHECK_TOKEN}`);
}

export function changeEmail(data) {
  return sendRequest(`${BASE_URL}/email`, 'PUT', data);
}

export function changePassword(data) {
  return sendRequest(`${BASE_URL}/password`, 'PUT', data);
}

export function deleteAccount() {
  return sendRequest(`${BASE_URL}`, 'DELETE');
}