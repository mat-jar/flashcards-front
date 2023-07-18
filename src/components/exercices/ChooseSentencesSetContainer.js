import React, {useState} from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + '/api/v1/english_sentences';

export default function ChooseSentencesSetContainer(props) {

const [searchWord, setSearchWord] = useState();
const [randomSentencesNumber, setRandomSentencesNumber] = useState(10);
const [translationSentence, setTranslationSentence] = useState();
const [resultSentence, setResultSentence] = useState();



function getSentences() {
  const params = { english_sentences: {key_word: searchWord, number: randomSentencesNumber}};
  return axios
    .post(API_URL, (params)
    )
    .then((response) => {
      props.setReceivedSentences(response.data.english_sentences);
      return response;

    })
    .catch((error) => console.log(error));
}

function getRandomSentences() {
  const params = { random_english_sentences: {number: randomSentencesNumber}};
  return axios
    .post(API_URL + "/random", (params)
    )
    .then((response) => {
      props.setReceivedSentences(response.data.random_english_sentences);
      return response;

    })
    .catch((error) => console.log(error));
}


function handleChange(event) {
  setSearchWord(event.target.value);
}

function handleFocus(event) {
  event.target.value = "";
  setSearchWord(event.target.value);
}

function handleSubmit(event) {
  if (event.key === 'Enter'){
    event.target.blur();
  }
  event.preventDefault();
  if (searchWord) {
    getSentences();
  }
}



  return(

    <>
    <div>
    <button className="btn btn-secondary btn-block my-3"
    onClick={(e) => {
      e.preventDefault();
      getRandomSentences();
      }}
      >Pick random set</button>
      </div>
    <form id="get_sentences" className="mx-1 my-auto d-inline w-43" onSubmit={handleSubmit}>
    <div className="input-group">
      <input id="get_sentences" className="form-control mr-sm-2" onFocus={handleFocus} type="text" placeholder="Type an English word" aria-label="Search" onChange={handleChange} ></input>

      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Show sentences</button>
    </div>
    </form>

    </>

  );
}
