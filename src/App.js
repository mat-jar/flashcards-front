import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Articles from "./pages/Articles";
import About from "./pages/About";
import ArticlesContainer from "./components/ArticlesContainer";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardStudent from "./components/board-student.component";
import BoardTeacher from "./components/board-teacher.component";
import BoardAdmin from "./components/board-admin.component";
import Car from "./components/Car";

class App extends Component {


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
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/register" element={<Register/>} />
            <Route exact path="/profile" element={<Profile/>} />
            <Route path="/student" element={<BoardStudent/>} />
            <Route path="/teacher" element={<BoardTeacher/>} />
            <Route path="/admin" element={<BoardAdmin/>} />
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
