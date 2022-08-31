import React, { Component } from "react";
import {  Link } from "react-router-dom";
import AuthService from "../services/AuthService";
import { useNavigate} from "react-router-dom";

class Navbar extends Component {

  constructor(props) {
      super(props);
      this.logOut = this.logOut.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleFocus = this.handleFocus.bind(this);
      this.state = {
        successful: false,
        message: "",
        searchPhrase: ""
      };
    }

    handleChange(event) {
      this.setState({searchPhrase: event.target.value});
    }

    handleFocus(event) {
      event.target.value = "";
      this.setState({searchPhrase: event.target.value});
    }

    handleSubmit(event) {

      const {navigation} = this.props;
      this.props.setSearchPhrase(this.state.searchPhrase);
      navigation("/search")
      event.preventDefault();
    }

    logOut(e) {
      const {navigation} = this.props;
      e.preventDefault();
      AuthService.logout().then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          }
        );
          this.props.showToast(response.data.message);
          this.props.setUser()
          const timer = setTimeout(() => {
            navigation("/")
          }, 1000);
          return () => clearTimeout(timer);
          ;
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.props.showToast(resMessage);
          this.setState({
            message: resMessage
          });
        }
      );


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



  <form className="mx-1 my-auto d-inline w-43" onSubmit={this.handleSubmit}>
  <div className="input-group">
    <input className="form-control mr-sm-2" onFocus={this.handleFocus} type="text" placeholder="Look up a title, a category or any words in description" aria-label="Search" onChange={this.handleChange} ></input>

    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search flashard sets</button>
  </div>
  </form>


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

export default function NavbarWrapper(props) {
  const navigation = useNavigate();

  return <Navbar {...props} navigation={navigation} />;
}
