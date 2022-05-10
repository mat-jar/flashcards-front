import React, { Component } from "react";
import axios from "axios";
import update from "immutability-helper";


class FlashcardSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flashcards: [],
      flashcard_set_id: window.location.pathname.split("/").slice(-1)

    };
  }

  loadFlashcards() {
    axios
      .get(`/api/v1/flashcard_sets/${this.state.flashcard_set_id}/flashcards`)
      .then((response) => {
        this.setState({ flashcards: response.data });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.loadFlashcards();
  }

  handleChange = (e) => {
  this.setState({inputValue: e.target.front_text});
  }

  modifyFlashcard = (e, id) => {
  axios
    .put(`/api/v1/flashcard_sets/${this.state.flashcard_set_id}/flashcards/${id}`, { flashcard: { read: e.target.checked } })
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
  if (e.key === "Enter" && !(e.target.front_text === "")) {
    axios
      .post(`/api/v1/flashcard_sets/${this.state.flashcard_set_id}/flashcards`, { flashcard: { front_text: e.target.value, back_text: e.target.value } })
      .then((response) => {
        const flashcards = update(this.state.flashcards, {
          $splice: [[0, 0, response.data]],
        });

        this.setState({
          flashcards: flashcards,
          inputValue: "",
        });
      })
      .catch((error) => console.log(error));
  }
};

  render() {
    return (
      <div>
        <div className="flashcardContainer">
          <input
            className="newFlashcard"
            type="string"
            placeholder="Input a Flashcard and Press Enter"
            maxLength="75"
            onKeyPress={this.newFlashcard}
            value={this.state.inputValue}
            onChange={this.handleChange}
          />

        </div>
        <div className="wrapItems">
          <ul className="listItems">
            {this.state.flashcards.map((flashcard) => {
              return (
                <li className="item" flashcard={flashcard} key={flashcard.id}>
                <input className="itemCheckbox" type="checkbox"
                checked={flashcard.read}
                onChange={(e) => this.modifyFlashcard(e, flashcard.id)} />

                  <label className="itemDisplay">{flashcard.front_text}</label>


                  <span className="removeItemButton"
                  onClick={(e) =>
                  {if (window.confirm("Delete the flashcard")) {
                  this.removeFlashcard(flashcard.id);
                  }
                  }
                  }
                  >
                  x
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default FlashcardSet;
