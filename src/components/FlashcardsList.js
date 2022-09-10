import React, { Component } from "react";
import axios from "axios";
import update from "immutability-helper";
import runtimeEnv from '@mars/heroku-js-runtime-env'
import {useParams} from 'react-router-dom';
const API_URL = runtimeEnv().REACT_APP_API_URL + '/api/v1/flashcard_sets';




class FlashcardsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      flashcards: [],
      inputFrontText: "",
      inputBackText: "",
      flashcard_set_id: this.props.params.id
    };
  }

  loadFlashcards() {
    axios
      .get(API_URL + `/${this.state.flashcard_set_id}/shared_flashcards`)
      .then((response) => {
        this.setState({ flashcards: response.data.flashcards });
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
//debugger;
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
      <div className="">

        <div className="wrapItems">
          <table className="flashcardsTable table table-hover text-center table-borderless">
          <thead>
            <tr className="d-flex">
              <th className="col-6">Front</th>
              <th className="col-6">Back</th>
            </tr>
          </thead>
          <tbody>
            {this.state.flashcards.map((flashcard) => {
              return (
                <tr className="item d-flex" flashcard={flashcard} key={flashcard.id}>
                <td className="col-6">
                  <div className="border p-4 bg-light div-hover">
                  <label className="itemDisplay">{flashcard.front_text} &nbsp;</label>
                  </div>
                </td>
                <td className="col-6">
                <div className="border p-4 bg-light div-hover">
                  <label className="itemDisplay">{flashcard.back_text} &nbsp;</label>
                </div>
                </td>
                </tr>
              );
            })}
            </tbody>
            </table>

        </div>


      </div>
    );
  }
}

export default function FlashcardsListWrapper(props) {
  const params = useParams();

  return <FlashcardsList {...props} params={params} />;
}
