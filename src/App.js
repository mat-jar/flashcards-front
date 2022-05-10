import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Articles from "./pages/Articles";
import About from "./pages/About";
import ArticlesContainer from "./components/ArticlesContainer";
import FlashcardSetList from "./components/FlashcardSetList";
import FlashcardSet from "./components/FlashcardSet";
import FlashcardSet1 from "./components/FlashcardSet1";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardStudent from "./components/BoardStudent";
import BoardTeacher from "./components/BoardTeacher";
import BoardAdmin from "./components/BoardAdmin";
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
            <Route index element={<About/>} />
            <Route exact path='/articles' element={<Articles/>} />
            <Route path='/flashcard_set_list' element={<FlashcardSetList/>} />
            <Route path='/articles/:id' element={<Car/>} />
            <Route path='/flashcard_sets/:id' element={<FlashcardSet/>} />
            <Route path='/flashcard_sets1/:id' element={<FlashcardSet1/>} />
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
