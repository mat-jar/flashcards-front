import React, { Component } from "react";
import update from "immutability-helper";
import {  Link } from "react-router-dom";
import AuthService from "../services/AuthService";


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }


  render() {
    const { currentUser } = this.state;
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

export default Dashboard;
