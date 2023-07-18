import React, {useState, useEffect} from "react";
import axios from "axios";
import OrganizeSentenceInnerContainer from"./OrganizeSentenceInnerContainer";
import ChooseSentencesSetContainer from"./ChooseSentencesSetContainer";


const API_URL = process.env.REACT_APP_API_URL + '/api/v1/english_sentences';

export default function OrganizeSentenceContainer(props) {

const [receivedSentences, setReceivedSentences] = useState([]);
const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
const [remainedSentences, setRemainedSenteces] = useState([]);
const [isSentenceCompleted, setIsSentenceCompleted] = useState(false);
const [isSentenceSetFinished, setIsSentenceSetFinished] = useState(false);


function removeSentence() {
  let current_sentence_index = currentSentenceIndex
  if (currentSentenceIndex > remainedSentences.length-2) {
    setCurrentSentenceIndex(0);
  }
  setRemainedSenteces([
    ...remainedSentences.slice(0, current_sentence_index),
    ...remainedSentences.slice(current_sentence_index + 1)
  ]);
  if (remainedSentences.length === 0) {
    setIsSentenceSetFinished(true);
  }
}


function switchSentence() {
  let current_sentence_index = currentSentenceIndex + 1
  if (current_sentence_index > remainedSentences.length-1) {
    current_sentence_index = 0
  }
  setCurrentSentenceIndex(current_sentence_index);
}

useEffect(() => {
  setRemainedSenteces(receivedSentences);
  setCurrentSentenceIndex(0);
  setIsSentenceSetFinished(false);
}, [receivedSentences]);


  return(

    <>
    <p className="display-9 text-center my-4">Organize Sentence</p>
    <ChooseSentencesSetContainer
    setReceivedSentences={setReceivedSentences}/>

    {remainedSentences.length > 0 && remainedSentences[currentSentenceIndex] && (
      <div>
      <OrganizeSentenceInnerContainer current_sentence = {remainedSentences[currentSentenceIndex]} setParentIsSentenceCompleted = {setIsSentenceCompleted} />
      </div>
    )}
    {isSentenceSetFinished && (
    <div>
    <p>The set is over, choose another to study</p>
    </div>
    )}
    {remainedSentences[currentSentenceIndex] && !isSentenceCompleted && (
    <>
    <div>
    <button className="btn btn-secondary btn-block my-3 m-1"
    onClick={(e) => {
      e.preventDefault();
      switchSentence();
      }}
      >Try this sentence later</button>
      <button className="btn btn-secondary btn-block my-3 m-1"
      onClick={(e) => {
        e.preventDefault();
        removeSentence();
        }}
        >Don't practise this sentence</button>
        </div>
      </>
    )}
    {isSentenceCompleted && (
    <div>
    <button className="btn btn-secondary btn-block my-3"
    onClick={(e) => {
      e.preventDefault();
      removeSentence();
      }}
      >Next sentence</button>
      </div>
    )}

    </>

  );
}
