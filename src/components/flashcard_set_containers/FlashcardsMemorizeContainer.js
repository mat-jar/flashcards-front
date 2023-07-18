import React, {useState, useEffect} from "react";
import SingleFlashcardMemorizeContainer from "./SingleFlashcardMemorizeContainer";
import ProgressBar from "./ProgressBar";
import FlashcardsMemorizeOptions from "./FlashcardsMemorizeOptions";
import {displayCorners} from '../../Utils'

export default function FlashcardsMemorizeContainer(props) {


const [isToggled, setIsToggled] = useState(false);
const [remainedFlashcards, setRemainedFlashcards] = useState(props.flashcards);
const [topFlashcard, setTopFlashcard] = useState(0);
const [constructorHasRun, setConstructorHasRun] = useState(false);
const [flashcardsColoursHash, setFlashcardsColoursHash] = useState(new Map());

const numbersHash = new Map([
    [1, "first"],
    [2, "second"],
    [3, "third"],
    [4, "fourth"],
    [5, "fifth"],
]);

if (!constructorHasRun) {
    setFlashcardsColoursHash(new Map([
        [remainedFlashcards[0], "first-color"],
        [remainedFlashcards[1], "second-color"],
        [remainedFlashcards[2], "third-color"],
        [remainedFlashcards[3], "fourth-color"],
        [remainedFlashcards[4], "fifth-color"],
        [remainedFlashcards[5], "sixth-color"],
    ]));
    setConstructorHasRun(true);
  };


function toggleCard() {
 setIsToggled(!isToggled);
}

function switchCard(option) {

  const flashcard_on_top = remainedFlashcards[0]

  if (isToggled===true){
    if (option==="correct") {
      const [first, ...rest] = remainedFlashcards;
      toggleCard()
      setRemainedFlashcards(rest);
    }

   if (option==="wrong") {
     const [first, ...rest] = remainedFlashcards;
     toggleCard()
     setRemainedFlashcards(rest.concat(first));

   }
  }
  setFlashcardsColoursHash(new Map(flashcardsColoursHash.set(remainedFlashcards[6], flashcardsColoursHash.get(flashcard_on_top))));
}



function handleKeyDown(event) {
  event.preventDefault();
  if (event.key === ' ') {
   toggleCard();
  }
  else if (event.key === 'ArrowUp') {
   switchCard("correct");
 }
 else if (event.key === 'ArrowDown') {
  switchCard("wrong");
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
    <div className={"col-md-9 bg-primary p-4 flashcardset-memorize-container " + displayCorners("left")}>
    <p className="display-9 text-center my-4">{this.state.flashcard_set.title ? `"${this.state.flashcard_set.title}"`  : "New"} flashcard set</p>
    <div className="memorize-container">
    <FlashcardsMemorizeOptions/>
    <ProgressBar all={props.flashcards.length} completed={remainedFlashcards.length}/>


    {remainedFlashcards.length===0 && (
      <div className="memorize-start-again"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setRemainedFlashcards(props.flashcards);
        }}>Start again</div>
    )}

    {remainedFlashcards.slice(0,5).map((flashcard, i) => {
      const color = flashcardsColoursHash.get(flashcard);
      return(
      <div className={`memorize-card ${numbersHash.get(i+1)} ${color} ` + ((isToggled && topFlashcard===i) ? "flipped" : "") } onClick={toggleCard} key={flashcard.id}>
        <SingleFlashcardMemorizeContainer key={flashcard.id} color={color} flashcard={flashcard} number={numbersHash.get(i+1)} switchCard={(option) => switchCard(option)}/>
      </div>
    );

  })}
    </div>
    </div>
    <div className={"col-md-3 bg-secondary p-4 flashcardset-memorize-container " + displayCorners("right")}>
    </div>
    </>

  );
}
