import React, {useState, useEffect} from "react";


import FlashcardSetList from "./FlashcardSetList";

export default function Search(props) {
  const searchPhrase = props.searchPhrase;


  return(


  <div className="row">
  <div className="col-md-6 bg-primary p-4 rounded-left-1-5">
  <p className="display-9 text-center my-4"> Search results for phrase "{searchPhrase}":</p>
  
  <FlashcardSetList
  key = {searchPhrase}
  searchPhrase = {searchPhrase}
  listMode="shared"
  />

  </div>
  <div className="col-md-6 bg-secondary p-4 rounded-right-1-5">

</div>
</div>
  );
}
