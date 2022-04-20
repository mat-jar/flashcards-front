import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Articles from "./pages/Articles";
import About from "./pages/About";
import ArticlesContainer from "./components/ArticlesContainer";


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
          </Routes>
          </div>
        </div>

      </div>
      </Router>
    );
  }
}

const NoMatch = () => {
  return (<p>There's nothing here: 404!</p>);
};

export default App;
