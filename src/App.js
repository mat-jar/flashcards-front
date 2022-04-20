import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Articles from "./pages/Articles";
import About from "./pages/About";
import ArticlesContainer from "./components/ArticlesContainer";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUStudent from "./components/board-student.component";
import BoardTeacher from "./components/board-teacher.component";
import BoardAdmin from "./components/board-admin.component";
import Car from "./components/Car";

class App extends Component {
  constructor(props) {
      super(props);
      this.logOut = this.logOut.bind(this);
      this.state = {
        showModeratorBoard: false,
        showAdminBoard: false,
        currentUser: undefined,
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
    return (
      <Router>
      <div className="header">
        <div className="navbar">
        <Navbar />
        </div>
      </div>
      <div className="mainContainer">

        <div className="topHeading">
          <h1>Articles App</h1>
          <div className="pageContent">
          <Routes>
            <Route index element={<Articles/>} />
            <Route path='/articles' element={<Articles/>} />
            <Route path='/about' element={<About/>} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
          </div>
        </div>

      </div>
      <div className="content">
      <Car/>
      </div>
      </Router>
    );
  }
}

const NoMatch = () => {
  return (<p>There's nothing here: 404!</p>);
};

export default App;
