import React, {useState, useEffect, useLayoutEffect} from "react";
import SingleFlashcardMemorizeContainer from "./SingleFlashcardMemorizeContainer";

export default function FlashcardsMemorizeContainer(props) {

const CARD_PEN_OFFSET = 10, //displacement of the cards
      CARD_SWITCH_RANGE = '130%';

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

let cardArray;
let last_element;
let isMoving;
let offsetArray = [];


function setCardOffset() {
  cardArray.forEach(function(item, index){
    item.style.zIndex = Math.abs(index - cardArray.length);
    item.style.transform = `translate(${offsetArray[index]}px, ${offsetArray[index]}px)`;
  });
}

function cardSwitching(e) {
  e.preventDefault();
  console.log("click");
  let animationObject = {}, previousSibling, scrolling = '';


  for (let index of cardArray) {
    if ((parseInt(window.getComputedStyle(index).zIndex) === cardArray.length) || (parseInt(index.style.zIndex) === cardArray.length)) {

      /*switch the rearmost card */
      if (e.deltaY < 0 || e.keyCode === 38) { //deltaY < 0 -> scrolling up
        previousSibling = index.previousElementSibling;
        if (previousSibling === null) previousSibling = last_element;
      }

      animationObject = e.deltaY < 0 || e.keyCode === 38 ? previousSibling : e.deltaY > 0 || e.keyCode === 40 ? index : '';
      animationObject.style.transform = `translate(0px, -${CARD_SWITCH_RANGE})`;
      scrolling = e.deltaY < 0 || e.keyCode === 38 ? 'up' : e.deltaY > 0 || e.keyCode === 40 ? 'down' : '';
      isMoving = true;
    }
  }

  if (animationObject !== undefined) {
    animationObject.addEventListener('transitionend', function(){
      if (scrolling === 'down') {
        animationObject.style.zIndex = 0;
        animationObject.style.transform = `translate(${offsetArray[cardArray.length]}px, ${offsetArray[cardArray.length]}px)`;
        offsetSwitch(scrolling);
      }

      else if (scrolling === 'up'){
        offsetSwitch(scrolling);
        animationObject.style.zIndex = cardArray.length;
        animationObject.style.transform = `translate(0px, 0px)`;
      }
      scrolling = '';
    }, {once: true });
  }
}

function offsetSwitch(scrolling) {
  for (let index of cardArray) {
    index.style.zIndex = scrolling === 'down' ? parseInt(index.style.zIndex) + 1 : parseInt(index.style.zIndex) - 1;
    let offsetIndex = Math.abs(parseInt(index.style.zIndex) - cardArray.length);
    index.style.transform = `translate(${offsetArray[offsetIndex]}px, ${offsetArray[offsetIndex]}px)`;

    index.addEventListener('transitionend', () => isMoving = false, {once: true });
  }
}

function toggleCard() {
 setIsToggled(!isToggled);
}

function switchCard(option) {

  const flashcard_on_top = remainedFlashcards[0]

  if (isToggled===true){
    if (option=="correct") {
      const [first, ...rest] = remainedFlashcards;
      toggleCard()
      setRemainedFlashcards(rest);
    }

   if (option=="wrong") {
     const [first, ...rest] = remainedFlashcards;
     toggleCard()
     setRemainedFlashcards(rest.concat(first));

   }
  }
  setFlashcardsColoursHash(new Map(flashcardsColoursHash.set(remainedFlashcards[6], flashcardsColoursHash.get(flashcard_on_top))));
}


useEffect(() => {
  cardArray = [...document.querySelectorAll('div[class*="memorize-card"]')];

  last_element = cardArray[cardArray.length - 1];
  isMoving = false;

});

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

    <div className="memorize-container">

    {remainedFlashcards.slice(0,5).map((flashcard, i) => {
      const color = flashcardsColoursHash.get(flashcard);
      return(
      <div className={`memorize-card ${numbersHash.get(i+1)} ${color} ` + ((isToggled && topFlashcard==i) ? "flipped" : "") } onClick={toggleCard} key={flashcard.id}>
        <SingleFlashcardMemorizeContainer key={flashcard.id} color={color} flashcard={flashcard} number={numbersHash.get(i+1)} switchCard={(option) => switchCard(option)}/>
      </div>
    );

  })}
    </div>


  );
}
