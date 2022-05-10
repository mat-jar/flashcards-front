import axios from "axios";
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
        //if (response.data.auth_token) {
        //localStorage.setItem("header_obj", response.headers.authorization);
        //localStorage.setItem("header-data1", response.data.auth_token);
        localStorage.setItem("user", JSON.stringify(response.data));
        //}
        //return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(email, password) {
    return axios.post(API_URL, { user:
      {
      email,
      password,
    }
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}
export default new AuthService();
