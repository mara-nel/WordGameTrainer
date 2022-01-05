import { useState, useEffect } from "react";
import Rack from "./Rack";
import Field from "./Field";

const Board = ({tiles, enteredValues, setEnteredValues, checkWord }) => {
  const [unplayedTiles, setUnplayedTiles] = useState(tiles);

  useEffect(() => {
    syncPlayedTiles();
  }, [tiles]);

  useEffect(() => {
    if (unplayedTiles.length === 0) {
      checkWord(getWordFromEnteredValues());
    }
  }, [unplayedTiles]);

  
  useEffect(() => {
    syncPlayedTiles();
  }, [enteredValues]);


  const getWordFromEnteredValues = () => {
    let word = '';
    enteredValues.forEach( l => word += l);
    return word;
  }

  const syncPlayedTiles = () => {
    let remaining = Array.from(tiles);
    let enteredLetters = enteredValues.filter(l => l !== '');
    enteredLetters.forEach(function(c) {
      let i = remaining.indexOf(c);
      if (i > -1) {
        remaining.splice(i, 1);
      } else if (remaining.includes('*')) {
        remaining.splice(remaining.indexOf('*'), 1);
      }
    });
    setUnplayedTiles(remaining);
  }

  return (
    <div>
      <Rack 
        tiles={unplayedTiles}/>
      <Field 
        enteredValues={enteredValues}
        setEnteredValues={setEnteredValues}
        restricted={true}
        restrictedOptions={unplayedTiles} />
    </div>
  );

}
export default Board;
