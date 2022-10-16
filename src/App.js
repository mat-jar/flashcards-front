import React, { Component } from "react";
//import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import FlashcardSet from "./components/FlashcardSet";
import Search from "./components/Search";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import ProfileSettings from "./components/ProfileSettings";
import Dashboard from "./components/Dashboard";
import AuthService from "./services/AuthService";



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
      searchPhrase: undefined
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

  setSearchPhrase(phrase) {
    this.setState({
      searchPhrase: phrase
    });
  }

  showToast(message) {
    toast.success(message);
  }


  render() {
    const { currentUser, searchPhrase } = this.state;
    return (
      <Router>
      <div className="header">

        <Navbar
        currentUser={currentUser}
        setUser={() => this.setUser()}
        setSearchPhrase={phrase => this.setSearchPhrase(phrase)}
        showToast={message => this.showToast(message)}
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
            <Route exact path="/search" element={<Search
                          searchPhrase={searchPhrase}/>} />

            <Route path="*" element={<NoMatch />} />
            <Route exact path="/login" element={<LogIn
                        currentUser={currentUser}
                        setUser={() => this.setUser()}
                        source="navbar"
                         />} />
            <Route exact path="/signup" element={<SignUp/>} />
            <Route exact path="/profilesettings" element={<ProfileSettings
                         currentUser={currentUser}
                         />} />
             <Route exact path="/dashboard" element={<Dashboard
                          currentUser={currentUser}
                          />} />
            

          </Routes>
          </div>
        </div>

      </div>

      <div>
      <Footer/>
      </div>
      <ToastContainer pauseOnHover={false} autoClose={2000}/>
      </Router>

    );
  }
}

const NoMatch = () => {
  return (<p>There's nothing here: 404!</p>);
};

export default App;
