import React, { Component } from "react";
import {  Link } from "react-router-dom";
import AuthService from "../services/AuthService";
class Navbar extends Component {

  constructor(props) {
      super(props);
      this.logOut = this.logOut.bind(this);
    }


    logOut() {
      AuthService.logout();
      this.props.setUser()
    }

  render() {
  const currentUser = this.props.currentUser;
  return (
  <div>
  <nav className="navbar navbar-expand navbar-dark bg-dark">
  <ul className="navbar-nav me-5 ms-5">
    <li className="nav-item">
        <Link to="/" className="nav-link">
        Home
        </Link>
    </li>
  </ul>

  <ul className="navbar-nav ms-5">
  <form className="row row-cols-lg-auto g-3 align-items-center">
  <li className="nav-item">
    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
  </li>
  <li className="nav-item">
    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
  </li>
  </form>
  </ul>

    { currentUser ? (

    <ul className="navbar-nav ms-auto me-5">


    {currentUser.name ? (
    <span className="navbar-text">Hello, {currentUser.name}!</span>
    ) : (
    <span className="navbar-text">Hello, Anonymus!</span>
    )}


    <li className="nav-item">
      <Link to={"/dashboard"} className="nav-link">
        Your flashcards dashboard
      </Link>
    </li>

    <li className="nav-item">
      <Link to={"/profilesettings"} className="nav-link">
        Your profile settings
      </Link>
    </li>

    <li className="nav-item">
      <a href="/" className="nav-link" onClick={this.logOut}>
        Log out
      </a>
    </li>

    </ul>

  ):(
    <ul className="navbar-nav ms-auto me-5">
    <li className="nav-item">
      <Link to={"/login"} className="nav-link">
        Log in
      </Link>
    </li>

    <li className="nav-item">
      <Link to={"/signup"} className="nav-link">
        Sign up
      </Link>
    </li>
    </ul>
  )}
 </nav>
  </div>
  );
}
}
export default Navbar;
