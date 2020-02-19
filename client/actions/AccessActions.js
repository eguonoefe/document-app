import * as actionTypes from './actionTypes';
import axiosInstance, { setAuthorizationToken } from '../utilities/setAuthorizationToken';

/**
 * @class AccessActions
 */
class AccessActions {
  /**
  * Request to the API to create a user
  *
  * @static
  * @param {Object} userDetails The details of the user to be created
  * @returns {Object} dispatch object
  * @memberof AccessActions
  */
  static signUpUser(userDetails) {
    return (dispatch) => axiosInstance.post('/users', userDetails)
      .then((response) => {
        if (response.status === 201) {
          setAuthorizationToken(response.data.token);
          const { token } = response.data;
          localStorage.setItem('jwToken', token);
          return dispatch({
            type: actionTypes.SIGN_UP_USER,
            message: null,
            user: response.data.userData
          });
        }
      }).catch(({ response }) => {
        if (response.status === 409) {
          return dispatch({
            type: actionTypes.USER_ALREADY_EXISTS,
            message: response.data.message
          });
        }
        if (response.status === 400) {
          return dispatch({
            type: actionTypes.ACCESS_ERROR,
            message: response.data.message
          });
        }
        return dispatch({
          type: actionTypes.ACCESS_ERROR,
          message: 'There was an error, please try again'
        });
      });
  }

  /**
  * Request to the API to login a user
  *
  * @static
  * @param {Object} userDetails The details of the user to be logged in
  * @returns {Object} dispatch object
  * @memberof AccessActions
  */
  static signInUser(userDetails) {
    return (dispatch) => axiosInstance.post('/users/login', userDetails)
      .then((response) => {
        if (
          response.status === 200) {
          setAuthorizationToken(response.data.token);
          const { token } = response.data;
          localStorage.setItem('jwToken', token);
          return dispatch({
            type: actionTypes.SIGN_IN_USER,
            message: null,
            user: response.data.userData
          });
        }
      }).catch(({ response }) => {
        if (
          response.data.message
          === 'User does not exist') {
          return dispatch({
            type: actionTypes.USER_DOES_NOT_EXIST,
            message: 'User does not exist'
          });
        }
        if (response.status === 400) {
          return dispatch({
            type: actionTypes.ACCESS_ERROR,
            message: response.data.message
          });
        }
        return dispatch({
          type: actionTypes.ACCESS_ERROR,
          message: 'There was an error, please try again'
        });
      });
  }

  /**
  * Request to the API to logout a user
  *
  * @static
  * @returns {Object} dispatch object
  * @memberof AccessActions
  */
  static signOutUser() {
    return (dispatch) => axiosInstance.post('/users/logout')
      .then((response) => {
        localStorage.removeItem('jwToken');
        return dispatch({
          type: actionTypes.SIGN_OUT_USER,
          message: response.data.message
        });
      }).catch(() => dispatch({
        type: actionTypes.ACCESS_ERROR,
        error: 'There was an error, please try again'
      }));
  }
}

export default AccessActions;
