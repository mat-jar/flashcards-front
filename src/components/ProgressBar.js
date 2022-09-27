import React from "react";

const ProgressBar = (props) => {
  const {all, completed } = props;
  return (
    <div className="flashcards-progress-bar-container">
      <div className="flashcards-progress-bar-filler" style={{width: `${completed/all*100}%`}}>
        <span className="flashcards-progress-bar-text">{`${completed} out of ${all}`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
