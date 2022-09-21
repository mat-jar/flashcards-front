import React, { useEffect, Component } from "react";
import {useParams} from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import FlashcardRowContainer from "./FlashcardRowContainer";



class FlashcardsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputFrontText: "",
      inputBackText: "",
      flashcard_set_id: this.props.params.id
    };

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

  render() {

    return (
      <div className="">

        <div className="wrapItems" >
          <table className="flashcardsTable table table-hover text-center table-borderless">
          <thead>
            <tr className="d-flex">
              <th className="col-6">Front</th>
              <th className="col-6">Back</th>
            </tr>
          </thead>
          <tbody >
            {this.props.flashcards.map((flashcard) => {
              return (
                <tr className="item d-flex" flashcard={flashcard} key={flashcard.id} >
                <FlashcardRowContainer flashcard={flashcard} />
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

  return <FlashcardsList {...props} params={params}  />;
}
