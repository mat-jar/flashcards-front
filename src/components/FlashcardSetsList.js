import React, { Component } from "react";
import axios from "axios";
import update from "immutability-helper";
import {  Link } from "react-router-dom";
import AuthService from "../services/AuthService";
import runtimeEnv from '@mars/heroku-js-runtime-env'


const API_URL = runtimeEnv().REACT_APP_API_URL + '/api/v1/flashcard_sets';


class FlashcardSetsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flashcard_sets: [],
    };
  }

  loadUserFlashcardSets() {
    axios
      .get(API_URL)
      .then((response) => {
        this.setState({ flashcard_sets: response.data });
      })
      .catch((error) => console.log(error));
  }

  loadSharedFlashcardSets(searchPhrase) {
    const params = { flashcard_set: {search_phrase: searchPhrase}};
    axios
      .post(API_URL + `/show_shared`, (searchPhrase ? params : {})
      )
      .then((response) => {
        this.setState({ flashcard_sets: response.data });
      })
      .catch((error) => console.log(error));
  }

  loadAccessibleFlashcardSets() {
    axios
      .post(API_URL + `/show_accessible`)
      .then((response) => {
        this.setState({ flashcard_sets: response.data });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    const currentUser = this.props.currentUser;
    const listMode = this.props.listMode;
    if (listMode === "shared") {
      this.loadSharedFlashcardSets(this.props.searchPhrase);
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
    const currentUser = this.props.currentUser;
    return (

      <div className="flashcardset-list">
        <div className="wrapItems">
          <ul className="list-group">
            {this.state.flashcard_sets.map((flashcard_set) => {
              return (
                <li className="list-group-item" flashcard_set={flashcard_set} key={flashcard_set.id}>
                  <Link to={`/flashcard_sets/${flashcard_set.id}`}>
                  <label className="itemDisplay">{flashcard_set.title}</label>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

    );
  }
}

export default FlashcardSetsList;
