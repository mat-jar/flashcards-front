import React, { Component } from "react";
import {  Link } from "react-router-dom";
import Login from "./login.component";
import Register from "./register.component";
import AuthService from "../services/auth.service";
class Navbar extends Component {

  constructor(props) {
      super(props);
      this.logOut = this.logOut.bind(this);
      this.state = {
        currentUser: undefined,
        userRole: undefined,
      };
    }
    componentDidMount() {
      const user = AuthService.getCurrentUser();
      if (user) {
        this.setState({
          currentUser: user,
          userRole: user.role,
        });
      }
    }
    logOut() {
      AuthService.logout();
    }

  render() {
  const { currentUser, userRole } = this.state;
  return (
  <div>
  <div>
    <li>
    <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/articles">Articles</Link>
    </li>
    <li>
      <Link to="/about">About</Link>
    </li>
  </div>
  { currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
    </div>
  );
}
}
export default Navbar;
