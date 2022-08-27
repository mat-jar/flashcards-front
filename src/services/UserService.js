import axios from 'axios';
import authHeader from './authHeader';
import runtimeEnv from '@mars/heroku-js-runtime-env'
const API_URL = runtimeEnv().REACT_APP_API_URL + '/api/v1/users';
class UserService {

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }
  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }
  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}
export default new UserService();
