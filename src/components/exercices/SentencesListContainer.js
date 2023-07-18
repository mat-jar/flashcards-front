import React, {useState} from "react";

import ChooseSentencesSetContainer from"./ChooseSentencesSetContainer";

export default function SentenceListContainer(props) {

const [receivedSentences, setReceivedSentences] = useState([]);

  return(

    <>
    <p className="display-9 text-center my-4">Explore Senteces</p>
    <ChooseSentencesSetContainer
    setReceivedSentences={setReceivedSentences}/>
    {receivedSentences.length > 0 && (
      <div>
      <ul className="list-group">
        {receivedSentences.map((sentence, index) => {
          return (
            <li className="list-group-item" sentence={sentence} key={index}>
              <label className="itemDisplay">{sentence}</label>
            </li>
          );
        })}
      </ul>
      </div>
    )}
    </>

  );
}
