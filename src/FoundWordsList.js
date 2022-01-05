import { useState, useEffect } from "react";

const FoundWordsList = ({words, dictionary}) => {
  
  return (
    <ul id="foundWords">
      {words.map((word) => (
        <li key={word.id}>
          {word.word}{word.found ? '' : ' (missed)'}: 
          <span className="definition">
            {dictionary[word.word]}
          </span>
        </li>
      ))}
    </ul>
  )    
}

export default FoundWordsList;
