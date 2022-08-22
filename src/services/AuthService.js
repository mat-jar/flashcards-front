import axios from "axios";
import authHeader from './authHeader';
const API_URL = "http://localhost:3000/api/v1/users";
class AuthService {

  login(email, password) {
    return axios
      .post(API_URL + "/sign_in", { user:
        {
        email,
        password
      }
      })
      .then(response => {
        if (response.headers.authorization) {
          localStorage.setItem("token", response.headers.authorization);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
        return response;
      });
  }
  logout() {
    return axios
      .delete(API_URL + "/sign_out", { headers: authHeader() })
      .then(response => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        return response;
      },
          error => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            return error;
          });

  }
  register(email, password) {
    return axios
      .post(API_URL, { user:
        {
        email,
        password
      }
    })
    .then(response => {
      return response;
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}
export default new AuthService();
