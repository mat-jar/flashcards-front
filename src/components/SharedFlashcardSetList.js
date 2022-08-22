import React, { Component } from "react";
import axios from "axios";
import update from "immutability-helper";
import {  Link } from "react-router-dom";
import AuthService from "../services/AuthService";
const API_URL = 'http://localhost:3000/api/v1/flashcard_sets';

class FlashcardSetList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_flashcard_sets: [],
      shared_flashcard_sets: [],
      accessible_flashcard_sets: [],
      currentUser: undefined,
      userRole: undefined,
    };
  }

  loadUserFlashcardSets() {
    axios
      .get(API_URL)
      .then((response) => {
        this.setState({ user_flashcard_sets: response.data });
      })
      .catch((error) => console.log(error));
  }

  loadSharedFlashcardSets() {
    axios
      .post(API_URL + `/show_shared`)
      .then((response) => {
        this.setState({ shared_flashcard_sets: response.data });
      })
      .catch((error) => console.log(error));
  }

  loadAccessibleFlashcardSets() {
    axios
      .post(API_URL + `/show_accessible`)
      .then((response) => {
        this.setState({ accessible_flashcard_sets: response.data });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.loadSharedFlashcardSets();
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        userRole: user.role,
      });
      this.loadUserFlashcardSets();
    }
    if (user.role == "teacher" || user.role == "admin") {
      this.loadAccessibleFlashcardSets();
    }
  }

  handleChange = (e) => {
  this.setState({inputValue: e.target.value});
  }

  modifyFlashcardSet = (e, id) => {
  axios
    .put(API_URL + `/${id}`, { flashcard_set: { read: e.target.checked } })
    .then((response) => {
      const flashcard_setIndex = this.state.flashcard_sets.findIndex(
        (x) => x.id === response.data.id
      );
      const flashcard_sets = update(this.state.flashcard_sets, {
        [flashcard_setIndex]: { $set: response.data },
      });
      this.setState({
        flashcard_sets: flashcard_sets,
      });
    })
    .catch((error) => console.log(error));
};
removeFlashcardSet = (id) => {
axios
  .delete(API_URL + `/${id}`)
  .then((response) => {
    const flashcard_setIndex = this.state.flashcard_sets.findIndex((x) => x.id === id);
    const flashcard_sets = update(this.state.flashcard_sets, {
      $splice: [[flashcard_setIndex, 1]],
    });
    this.setState({
      flashcard_sets: flashcard_sets,
    });
  })
  .catch((error) => console.log(error));
};

  newFlashcardSet= (e) => {
  if (e.key === "Enter" && !(e.target.value === "")) {
    axios
      .post(API_URL, { flashcard_set: { title: e.target.value } })
      .then((response) => {
        const flashcard_sets = update(this.state.flashcard_sets, {
          $splice: [[0, 0, response.data]],
        });

        this.setState({
          flashcard_sets: flashcard_sets,
          inputValue: "",
        });
      })
      .catch((error) => console.log(error));
  }
};

  render() {
    const { currentUser, userRole } = this.state;
    return (
      <div>
       {currentUser ? (
        <div className="newFlashcardSetForm">
          <input
            className="newFlashcardSet"
            type="string"
            placeholder="Input a FlashcardSet and Press Enter"
            maxLength="75"
            onKeyPress={this.newFlashcardSet}
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
        </div>
      ) : (
        <h2>Log in to add new Flashcard Set</h2>
      )}
        <div className="wrapItems">
          <ul className="listItems">
            {this.state.flashcard_sets.map((flashcard_set) => {
              return (
                <li className="item" flashcard_set={flashcard_set} key={flashcard_set.id}>
                <input className="itemCheckbox" type="checkbox"
                checked={flashcard_set.read}
                onChange={(e) => this.modifyFlashcardSet(e, flashcard_set.id)} />
                  <Link to={`/flashcard_sets/${flashcard_set.id}`}>
                  <label className="itemDisplay">{flashcard_set.title}</label>
                  </Link>
                  <span className="removeItemButton"
                  onClick={(e) =>
                  {if (window.confirm("Delete the flashcard set")) {
                  this.removeFlashcardSet(flashcard_set.id);
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

export default FlashcardSetList;
