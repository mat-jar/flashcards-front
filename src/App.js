import React, { Component } from "react";
//import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import UserFlashcardSetList from "./components/UserFlashcardSetList";
import FlashcardSet from "./components/FlashcardSet";
import FlashcardSet1 from "./components/FlashcardSet1";

import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";

import ProfileSettings from "./components/ProfileSettings";
import BoardStudent from "./components/BoardStudent";
import BoardTeacher from "./components/BoardTeacher";
import BoardAdmin from "./components/BoardAdmin";
import Car from "./components/Car";
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
      <div className="mainContainer">

        <div className="topHeading">
          <h1>Articles App</h1>
          <div className="pageContent">
          <Routes>
            <Route index element={<About/>} />
            <Route path='/user_flashcard_set_list' element={<UserFlashcardSetList/>} />
            <Route path='/articles/:id' element={<Car/>} />
            <Route path='/flashcard_sets/:id' element={<FlashcardSet/>} />
            <Route path='/flashcard_sets1/:id' element={<FlashcardSet1/>} />
            <Route path='/about' element={<About/>} />
            <Route path="*" element={<NoMatch />} />
            <Route exact path="/login" element={<LogIn
                        setUser={() => this.setUser()}
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
