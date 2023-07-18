import React, { Component } from "react";
import axios from "axios";
import update from "immutability-helper";
import authHeader from '../services/authHeader';
import FlashcardsListContainer from "./flashcard_set_containers/FlashcardsListContainer";
import NewFlashcardSetContainer from "./flashcard_set_containers/NewFlashcardSetContainer";
import FlashcardsMemorizeContainer from"./flashcard_set_containers/FlashcardsMemorizeContainer";
import FlashcardsFlickThroughContainer from"./flashcard_set_containers/FlashcardsFlickThroughContainer";

const API_URL = process.env.REACT_APP_API_URL + '/api/v1/flashcard_sets';

export default class FlashcardSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flashcards: [],
      flashcard_set_id: window.location.pathname.split("/").slice(-1),
      flashcard_set: [],
      mode: "list",
      currentUser: this.props.currentUser

    };
  }

  loadSharedFlashcardSet() {
    axios
      .get(API_URL + `/${this.state.flashcard_set_id}/shared_flashcards`)
      .then((response) => {
        this.setState({ flashcards: response.data.flashcards, flashcard_set: response.data.flashcard_set });
      })
      .catch((error) => console.log(error));
  }

  loadFlashcardSet() {
    axios
      .get(API_URL + `/${this.state.flashcard_set_id}/flashcards`, { headers: authHeader() })
      .then((response) => {
        this.setState({ flashcards: response.data.flashcards, flashcard_set: response.data.flashcard_set });
      })
      .catch((error) => console.log(error));
  }

  initializeFlashcardSet() {
    if (this.state.flashcard_set_id != "new" && this.props.currentUser) {
      if (this.props.currentUser == "unlogged") {
        console.log("lala")
        this.loadSharedFlashcardSet()
      } else {
        this.loadFlashcardSet()
      }
    }

  }

  componentDidUpdate(prevProps, prevState) {
            if (prevProps.currentUser !== this.props.currentUser) {
                   this.initializeFlashcardSet()
            }
    }

  componentDidMount() {
    this.initializeFlashcardSet()
  }


  render() {
    return (
      <div className="row">
        {
          {
            'memorize':
            <FlashcardsMemorizeContainer
            flashcards= {this.state.flashcards}/>,
            'flick_through':
            <FlashcardsFlickThroughContainer
            flashcards= {this.state.flashcards}/>,
            'list':
            <FlashcardsListContainer
            flashcardSet= {this.state.flashcard_set}
            flashcards= {this.state.flashcards}
            />,
            'new':
            <NewFlashcardSetContainer
            flashcardSet= {this.state.flashcard_set}
            flashcards= {this.state.flashcards}
            addFlashcard={(flashcard) => this.addFlashcard(flashcard)}
            />
          }[this.state.mode]
        }
        </div>
    );
  }
}
