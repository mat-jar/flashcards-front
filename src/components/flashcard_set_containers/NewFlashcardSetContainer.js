import React, { useEffect, Component } from "react";
import {useParams} from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import FlashcardRowContainer from "./FlashcardRowContainer";
import AddFlashcardRowContainer from "./AddFlashcardRowContainer";
import {displayCorners} from '../../Utils'



class NewFlashcardSetContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputFrontText: "",
      inputBackText: "",
    };

  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
    [name]: value
    });
  };

  render() {
    const flashcards = this.props.flashcards
    return (
      <>
      <div className={"col-md-6 bg-primary p-4 flashcardset-list-container " + displayCorners("left")}>
      <p className="display-9 text-center my-4">New flashcard set</p>
      <div>
        <div className="wrapItems" >
          <table className="flashcardsTable table table-hover text-center table-borderless">
          <thead>
            <tr className="d-flex">
              <th className="col-6">Front</th>
              <th className="col-6">Back</th>
            </tr>
          </thead>
          <tbody >
              <tr className="item d-flex" flashcard= "new_flashcard" key="new_flashcard" >
              <AddFlashcardRowContainer
              addFlashcard={(flashcard) => this.props.addFlashcard(flashcard)}/>
              </tr>

            {flashcards.map((flashcard, index) => {
              return (
                <tr className="item d-flex" flashcard={flashcard} key={index} >
                <FlashcardRowContainer flashcard={flashcard} />
                </tr>
              );
            })}
            </tbody>

            </table>

        </div>


      </div>
      </div>
      <div className={"col-md-6 bg-secondary p-4 flashcardset-list-container " + displayCorners("right")}>
      <div>
      <button className="btn btn-primary btn-block my-3"
      
        >Save new set</button>
      </div>
      </div>
      </>

    );

  }
}

export default function NewFlashcardSetWrapper(props) {
  const params = useParams();

  return <NewFlashcardSetContainer {...props} params={params}  />;
}
