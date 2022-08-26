import React, { Component } from "react";
//import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";

import FlashcardSet from "./components/FlashcardSet";
import FlashcardSet1 from "./components/FlashcardSet1";

import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";

import ProfileSettings from "./components/ProfileSettings";
import BoardStudent from "./components/BoardStudent";
import BoardTeacher from "./components/BoardTeacher";
import BoardAdmin from "./components/BoardAdmin";
import AuthService from "./services/AuthService";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

  setUser() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user
      });
    }
    else {
      this.setState({
        currentUser: undefined
      });
    }
  }


  render() {
    const { currentUser } = this.state;
    return (
      <Router>
      <div className="header">

        <Navbar
        currentUser={currentUser}
        setUser={() => this.setUser()}
         />
      </div>
      <div className="container ">

        <div className="topHeading">
          <h1 className="display-6 text-center my-4">Study languages with flashcards</h1>
          <div className="pageContent">
          <Routes>
            <Route index element={<Home
                                  currentUser={currentUser}
                                  setUser={() => this.setUser()}
                                  />} />

            <Route path='/flashcard_sets/:id' element={<FlashcardSet/>} />
            <Route path='/flashcard_sets1/:id' element={<FlashcardSet1/>} />

            <Route path="*" element={<NoMatch />} />
            <Route exact path="/login" element={<LogIn
                        setUser={() => this.setUser()}
                        source="navbar"
                         />} />
            <Route exact path="/signup" element={<SignUp/>} />
            <Route exact path="/profilesettings" element={<ProfileSettings
                         currentUser={currentUser}
                         />} />
            <Route path="/student" element={<BoardStudent/>} />
            <Route path="/teacher" element={<BoardTeacher/>} />
            <Route path="/admin" element={<BoardAdmin/>} />
          </Routes>
          </div>
        </div>

      </div>

      <div>
      <Footer/>
      </div>
      </Router>

    );
  }
}

const NoMatch = () => {
  return (<p>There's nothing here: 404!</p>);
};

export default App;
