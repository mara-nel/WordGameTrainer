import { useState, useEffect } from "react";
import Rack from "./Rack";
import Field from "./Field";

const Board = ({tiles, enteredValues, setEnteredValues, checkWord}) => {
  const [unplayedTiles, setUnplayedTiles] = useState(tiles);

  useEffect(() => {
    syncPlayedTiles();
  }, [tiles]);
  useEffect(() => {
    if (unplayedTiles.length === 0) {
      checkWord(getWordFromEnteredValues());
    }
  }, [unplayedTiles]);

  const getWordFromEnteredValues = () => {
    let word = '';
    enteredValues.forEach( l => word += l);
    return word;
  }

  const syncPlayedTiles = () => {
    let remaining = Array.from(tiles);
    enteredValues.forEach(function(c) {
      let i = remaining.indexOf(c);
      if (i > -1) {
        remaining.splice(i, 1);
      }
    });
    setUnplayedTiles(remaining);
  }


  return (
    <div>
      <Rack 
        tiles={unplayedTiles}/>
      <Field 
        length={7} 
        tiles={tiles} 
        enteredValues={enteredValues}
        setEnteredValues={setEnteredValues}
        unplayedTiles={unplayedTiles}
        handleSync={syncPlayedTiles}/>
    </div>
  );

}
export default Board;