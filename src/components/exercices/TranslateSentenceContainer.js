import React, {useState, useEffect} from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + '/api/v1/english_sentences';

export default function TranslateSentenceContainer(props) {


const [searchWord, setSearchWord] = useState();
const [translationSentence, setTranslationSentence] = useState();
const [resultSentence, setResultSentence] = useState();
const [sentences, setSenteces] = useState([]);
const [currentSentence, setCurrentSentence] = useState("");
const [currentSentenceIndex, setCurrentSentenceIndex] = useState();
const [remainedSentences, setRemainedSenteces] = useState([]);


function getSentences() {
  const params = { english_sentence: {word: searchWord}};
  return axios
    .post(API_URL, (params)
    )
    .then((response) => {
      const sentences_list = response.data.sentences
      setSenteces(sentences_list);
      setRemainedSenteces(sentences_list);
      const current_sentence_index = Math.floor(Math.random() * sentences_list.length);
      setCurrentSentenceIndex(current_sentence_index);
      setCurrentSentence(sentences_list[current_sentence_index]);
      return response;

    })
    .catch((error) => console.log(error));
}

function getTranslation() {
  const params = { translate_sentence: {sentence: translationSentence}};
  return axios
    .post(API_URL + '/translate', (params)
    )
    .then((response) => {
      setResultSentence(response.data.translated_sentence);
      return response;

    })
    .catch((error) => console.log(error));
}

function checkTranslation() {
  if (resultSentence) {
    if (currentSentence === resultSentence) {
      return "Your translation is correct"
    }
    else {
      return "Your translation is wrong. Try again"
    }
  }
}

function handleChange(event) {
  switch (event.target.id) {
    case "get_sentences":
      setSearchWord(event.target.value);
      break;
    case "check_translation":
      setTranslationSentence(event.target.value);
      break;
  }
}

function handleFocus(event) {

  switch (event.target.id) {
    case "get_sentences":
      event.target.value = "";
      setSearchWord(event.target.value);
      break;
    case "check_translation":
      break;
  }
}

function handleSubmit(event) {
  if (event.key === 'Enter'){
    event.target.blur();
  }
  event.preventDefault();
  switch (event.target.id) {
    case "get_sentences":
      if (searchWord) {
        getSentences();
      }
      break;
    case "check_translation":
      if (translationSentence) {
        getTranslation();
      }
      break;
  }
}

function switchSentence() {
  setRemainedSenteces(remainedSentences.splice(currentSentenceIndex, 1));
  setCurrentSentenceIndex(Math.floor(Math.random() * remainedSentences.length));
  setCurrentSentence(remainedSentences[currentSentenceIndex]);
}


function changeSentence() {
  setCurrentSentenceIndex(Math.floor(Math.random() * sentences.length));
  setCurrentSentence(sentences[currentSentenceIndex]);
  setResultSentence();
}

useEffect(() => {
    console.log(resultSentence);
}, [resultSentence]);


  return(

    <>
    <p className="display-9 text-center my-4">Translate Sentence</p>
    <form id="get_sentences" className="mx-1 my-auto d-inline w-43" onSubmit={handleSubmit}>
    <div className="input-group">
      <input id="get_sentences" className="form-control mr-sm-2" onFocus={handleFocus} type="text" placeholder="Type an English word" aria-label="Search" onChange={handleChange} ></input>

      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Show sentences</button>
    </div>
    </form>
    {sentences.length > 0 && (
      <div>
      <p>{currentSentence}</p>
      <form id="check_translation" className="mx-1 my-auto d-inline w-43" onSubmit={handleSubmit}>
      <div className="input-group">
        <input id="check_translation" className="form-control mr-sm-2" onFocus={handleFocus} type="text" placeholder="Write your translation" aria-label="Translate" onChange={handleChange} ></input>

        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Check translation</button>
      </div>
      </form>
      </div>
    )}
    {resultSentence && (<p>{checkTranslation()}</p>)}
    {currentSentence && (
    <div>
    <button className="btn btn-secondary btn-block my-3"
    onClick={(e) => {
      e.preventDefault();
      changeSentence();
      }}
      >Change the sentence</button>
      </div>
    )}

    </>

  );
}
