import React from "react";

export default function SingleFlashcardMemorizeContainer(props) {

  return(
        <>
        <div className= {`front ${props.color}`}>{props.flashcard.front_text}</div>
        <div className= {`back ${props.color}`}>
        <div className="memorize-answer-container" >
        <p className="memorize-answer-text">{props.flashcard.back_text}</p>
        </div>
        <div className="flashcard-buttons">
        <button className="btn btn-success btn-block my-3"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  props.switchCard("correct");
        }} >I knew it</button>

        <button className="btn btn-danger btn-block my-3"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          props.switchCard("wrong");
          }}
           >Show me again</button>
        </div>
        </div>
        </>
  );
}
