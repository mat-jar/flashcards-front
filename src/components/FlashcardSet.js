import React, { Component } from "react";
import axios from "axios";
import update from "immutability-helper";
import runtimeEnv from '@mars/heroku-js-runtime-env'
import FlashcardsList from "./FlashcardsList";
import {displayCorners} from '../Utils'
import FlashcardsMemorizeContainer from"./FlashcardsMemorizeContainer";

const API_URL = runtimeEnv().REACT_APP_API_URL + '/api/v1/flashcard_sets';



class FlashcardSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flashcards: [],
      flashcard_set_id: window.location.pathname.split("/").slice(-1),
      flashcard_set: [],
      inputFrontText: "",
      inputBackText: "",
      mode: ""

    };
  }

  loadFlashcards() {
    axios
      .get(API_URL + `/${this.state.flashcard_set_id}/shared_flashcards`)
      .then((response) => {
        this.setState({ flashcards: response.data.flashcards, flashcard_set: response.data.flashcard_set });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.loadFlashcards();
  }



  handleInputChange = (e) => {
    const { name, value } = e.target;
    //debugger;
    //const name = e.target.name
    //const value = e.target.value

    this.setState({

    [name]: value
    });
  };

  modifyFlashcard = (e, id) => {
  axios
    .put(API_URL + `/${this.state.flashcard_set_id}/flashcards/${id}`, { flashcard: { read: e.target.checked } })
    .then((response) => {
      const flashcardIndex = this.state.flashcards.findIndex(
        (x) => x.id === response.data.id
      );
      const flashcards = update(this.state.flashcards, {
        [flashcardIndex]: { $set: response.data },
      });
      this.setState({
        flashcards: flashcards,
      });
    })
    .catch((error) => console.log(error));
};
removeFlashcard = (id) => {
axios
  .delete(`/api/v1/flashcard_sets/${this.state.flashcard_set_id}/flashcards/${id}`)
  .then((response) => {
    const flashcardIndex = this.state.flashcards.findIndex((x) => x.id === id);
    const flashcards = update(this.state.flashcards, {
      $splice: [[flashcardIndex, 1]],
    });
    this.setState({
      flashcards: flashcards,
    });
  })
  .catch((error) => console.log(error));
};

  newFlashcard= (e) => {
  if (e.key === "Enter" && !(this.state.inputBackText === "") && !(this.state.inputFrontText === "")) {
    axios
      .post(`/api/v1/flashcard_sets/${this.state.flashcard_set_id}/flashcards`, { flashcard: { front_text: this.state.inputFrontText, back_text: this.state.inputBackText, } })
      .then((response) => {
        const flashcards = update(this.state.flashcards, {
          $splice: [[0, 0, response.data]],
        });

        this.setState({
          flashcards: flashcards,
          inputFrontText: "",
          inputBackText: ""
        });
      })
      .catch((error) => console.log(error));
  }
};

  render() {
    return (
      <div className="row">
      {this.state.mode === "memorize" ? (
        <>
        <div className={"col-md-9 bg-primary p-4 flashcardset-memorize-container " + displayCorners("left")}>
        <p className="display-9 text-center my-4">Study "{this.state.flashcard_set.title}"</p>
        <FlashcardsMemorizeContainer
        flashcards= {this.state.flashcards}
        />
        </div>
        <div className={"col-md-3 bg-secondary p-4 flashcardset-memorize-container " + displayCorners("right")}>
        <button className="btn btn-primary btn-block my-3"
        onClick={(e) => {
          e.preventDefault();
          this.setState({
            mode: "",
          });
          }}
          >Settings</button>
      </div>
        </>
      ) : (
      <>
      <div className={"col-md-6 bg-primary p-4 flashcardset-list-container  " + displayCorners("left")}>
      <p className="display-9 text-center my-4">"{this.state.flashcard_set.title}" flashcard set</p>
      <FlashcardsList
      listMode="shared"
      flashcards= {this.state.flashcards}
      />
      </div>
      <div className={"col-md-6 bg-secondary p-4 flashcardset-list-container  " + displayCorners("right")}>
      <button className="btn btn-primary btn-block my-3"
      onClick={(e) => {
        e.preventDefault();
        this.setState({
          mode: "memorize",
        });
        }}
        >Memorize</button>

        <button className="btn btn-primary btn-block my-3"
        onClick={(e) => {
          e.preventDefault();
          this.setState({
            mode: "memorize",
          });
          }}
          >Test</button>

          <button className="btn btn-primary btn-block my-3"
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              mode: "memorize",
            });
            }}
            >Find pairs game</button>

            <button className="btn btn-primary btn-block my-3"
            onClick={(e) => {
              e.preventDefault();
              this.setState({
                mode: "memorize",
              });
              }}
              >Glue the pieces</button>

              <button className="btn btn-primary btn-block my-3"
              onClick={(e) => {
                e.preventDefault();
                this.setState({
                  mode: "memorize",
                });
                }}
                >Flick through</button>


    </div>
    </>
    )}
    </div>
    );
  }
}

export default FlashcardSet;
