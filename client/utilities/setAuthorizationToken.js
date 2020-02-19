import axios from 'axios';

const APP_URL = 'http://localhost:7000/api/v1/';

const instance = axios.create({
  baseURL: APP_URL,
});

/**
* Function that sets the access token for API requests
* @param {String} token The token to be set (optional)
* @returns {void}
*/
export const setAuthorizationToken = (token) => {
  if (!token) {
    delete instance.defaults.headers.common.Authorization;
  }
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

setAuthorizationToken(localStorage.getItem('jwToken'));

export default instance;
