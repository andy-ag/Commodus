import * as usersAPI from './users-api';

export async function signUp(userData) {
  try {
    const token = await usersAPI.signUp(userData);
    localStorage.setItem('token', token)
    return getUser()
  } catch (error) {
    console.log(error)
  }  
}
  
export function getToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));
  // A JWT's exp is expressed in seconds, not milliseconds, so convert
  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem('token');
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export function logOut() {
  localStorage.removeItem('token');
}

export async function login(credentials){
  try {
    const token = await usersAPI.login(credentials);
    localStorage.setItem('token', token)
    return getUser()
  } catch (error) {
    console.log(error)
  }  
}

export async function checkToken() {
  const dateStr = await usersAPI.checkToken();
  return new Date(dateStr);
}
