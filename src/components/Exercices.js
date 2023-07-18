import React, {useState} from "react";
import WelcomeExercicesContainer from "./exercices/WelcomeExercicesContainer";
import TranslateSentenceContainer from "./exercices/TranslateSentenceContainer";
import OrganizeSentenceContainer from "./exercices/OrganizeSentenceContainer";
import SentencesListContainer from "./exercices/SentencesListContainer";
import {displayCorners} from '../Utils'


export default function Exercices(props) {

  const [exercicesMode, setExercicesMode] = useState('welcome');

  return(


  <div className="row">
  <div className={"col-md-9 bg-primary p-4 " + displayCorners("left")}>
  {
    {
      'welcome':
      <WelcomeExercicesContainer
      setExercicesMode={setExercicesMode}/>,
      'translate_sentence':
      <TranslateSentenceContainer/>,
      'organize_sentence':
      <OrganizeSentenceContainer/>,
      'sentences_list':
      <SentencesListContainer/>
    }[exercicesMode]
  }

  </div>
  <div className={"col-md-3 bg-secondary p-4 " + displayCorners("right")}>
  <div>
  <button className="btn btn-primary btn-block my-3"
  onClick={(e) => {
    e.preventDefault();
    setExercicesMode('welcome')
    }}
    >Go back to exercices list</button>
    </div>


</div>
</div>
  );
}
