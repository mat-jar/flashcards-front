import React, {useState, useEffect} from "react";
export default function WelcomeExercicesContainer(props) {


const [isToggled, setIsToggled] = useState(false);
const [remainedFlashcards, setRemainedFlashcards] = useState(props.flashcards);
const [topFlashcard, setTopFlashcard] = useState(0);
const [constructorHasRun, setConstructorHasRun] = useState(false);
const [flashcardsColoursHash, setFlashcardsColoursHash] = useState(new Map());





function handleKeyDown(event) {
  event.preventDefault();
  if (event.key === ' ') {

  }
  else if (event.key === 'ArrowUp') {

 }
 else if (event.key === 'ArrowDown') {

}
 };

 useEffect(() => {
   window.addEventListener('keydown', handleKeyDown);
   // cleanup this component
   return () => {
     window.removeEventListener('keydown', handleKeyDown);
     };
   });



  return(
    <>
    <p className="display-9 text-center my-4">Additional exercices</p>
    <div>
    <button className="btn btn-secondary btn-block my-3"
    onClick={(e) => {
      e.preventDefault();
      props.setExercicesMode('translate_sentence')
      }}
      >Translate sentence</button>
    </div>

    <div>
      <button className="btn btn-secondary btn-block my-3"
      onClick={(e) => {
        e.preventDefault();
        props.setExercicesMode('organize_sentence')
        }}
        >Organize sentence</button>
    </div>

    <div>
      <button className="btn btn-secondary btn-block my-3"
        onClick={(e) => {
          e.preventDefault();
          props.setExercicesMode('sentences_list')
          }}
          >Show all sentences</button>
    </div>
    </>


  );
}
