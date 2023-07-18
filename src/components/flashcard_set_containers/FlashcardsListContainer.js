import React, { useEffect, Component } from "react";
import {useParams} from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import FlashcardRowContainer from "./FlashcardRowContainer";
import {displayCorners} from '../../Utils'



class FlashcardsListContainer extends Component {

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
    const flashcard_set = this.props.flashcardSet
    return (
      <>
      <div className={"col-md-6 bg-primary p-4 flashcardset-list-container " + displayCorners("left")}>
      <p className="display-9 text-center my-4">{`"${flashcard_set.title}"`} flashcard set</p>
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
      <button className="btn btn-primary btn-block my-3"
      onClick={(e) => {
        e.preventDefault();
        this.setState({
          mode: "",
        });
        }}
        >Settings</button>

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
          mode: "test",
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
          mode: "flick_through",
        });
        }}
        >Flick through</button>
        </div>

      </>

    );

  }
}

export default function FlashcardsListWrapper(props) {
  const params = useParams();

  return <FlashcardsListContainer {...props} params={params}  />;
}
