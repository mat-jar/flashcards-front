import React, {useState, useEffect}  from "react";
import {shuffle} from '../../Utils'

export default function OrganizeSentenceInnerContainer(props) {
  const split_sentence = props.current_sentence.split(' ')
  const [wordPosition, setWordPosition] = useState(0);
  const [orderedSentence, setOrderedSentence] = useState([]);
  const [shuffledSentence, setShuffledSentence] = useState(shuffle(split_sentence));
  const [isSentenceCompleted, setIsSentenceCompleted] = useState(false);
  var ordered = [];

  function checkWord(word, index_shuffled_sentence) {
    if (split_sentence[wordPosition] === word) {
      setShuffledSentence([
        ...shuffledSentence.slice(0, index_shuffled_sentence),
        ...shuffledSentence.slice(index_shuffled_sentence + 1)
      ]);
      setOrderedSentence(orderedSentence.concat(word));
      setWordPosition(wordPosition + 1);
      return true
    }
  };

  useEffect(() => {
    setIsSentenceCompleted(false);
    props.setParentIsSentenceCompleted(false);
    setWordPosition(0);
    setOrderedSentence([]);
    setShuffledSentence(shuffle(split_sentence))
  }, [props.current_sentence]);

  useEffect(() => {
    if (!shuffledSentence.length) {
      setIsSentenceCompleted(true);
      props.setParentIsSentenceCompleted(true);
    }
  }, [shuffledSentence]);

  useEffect(() => {
    if (document.getElementsByClassName('ordered').length) {
    for (let button of document.getElementsByClassName('ordered')) {
      button.style.backgroundColor = "green";
      };
    }
  }, [isSentenceCompleted]);


  return(
        <>
        <div className="organize-sentence-words-container">
        <button className="btn btn-secondary btn-block m-1 invisible">X</button>
        <>
        {orderedSentence.map((word, i) => {
          return(
            <button className="btn btn-secondary btn-block m-1 ordered" key={i}>
            {word}
            </button>
          )
        })}

        </>
        </div>
        <div className="organize-sentence-words-container">
        <button className="btn btn-secondary btn-block m-1 invisible">X</button>
        {shuffledSentence.map((word, i) => {
          return(
            <button className="btn btn-secondary btn-block m-1" key={i}
            onClick={(e) => {
              e.preventDefault();
              if (!checkWord(word, i)) {
              e.target.style.backgroundColor = "red";
              const timer = setTimeout(() => {
                e.target.style.backgroundColor = "";
              }, 500);
                return () => clearTimeout(timer);
              }
              }}>
            {word}
            </button>
          )
        })}
        {isSentenceCompleted && (
          <span>Completed</span>
        )}
        </div>
        </>
  );
}
