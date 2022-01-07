import { useState, useEffect } from "react";
import Rack from "./Rack";
import Field from "./Field";

const Board = ({tiles, enteredValues, setEnteredValues, checkWord }) => {
  const [unplayedTiles, setUnplayedTiles] = useState(Array.from(tiles));

  useEffect(() => {
    resetBoard();
  }, [tiles]);

  useEffect(() => {
    if (unplayedTiles.length === 0) {
      checkWord(getWordFromEnteredValues());
    }
  }, [unplayedTiles]);

  
  useEffect(() => {
    syncTiles();
  }, [enteredValues]);


  const getWordFromEnteredValues = () => {
    let word = '';
    enteredValues.forEach( l => word += l);
    return word;
  }

  const unshuffleUnplayedTiles = () => {
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

  const resetBoard = () => {
    setUnplayedTiles(Array.from(tiles));
    setEnteredValues(Array(enteredValues.length).fill(''));
  }

  const clearField = () => {
    let enteredLetters = enteredValues.filter(l => l !== '');
    setUnplayedTiles([...unplayedTiles, ...enteredLetters]);
    setEnteredValues(Array(enteredValues.length).fill(''));
  }

  const syncTiles = () => {
    const tileCounts = {};
    Array.from(tiles).forEach(l => tileCounts[l] 
      ? tileCounts[l]++ 
      : tileCounts[l] = 1);
    let enteredLetters = enteredValues.filter(l => l !== '');
    enteredLetters.forEach(l =>  tileCounts[l] 
      ? tileCounts[l]--
      : tileCounts['*']--); //assumes input restriction working
    let orderedNew = [];
    let orderedOld = unplayedTiles;
    for (let i=orderedOld.length-1; i>=0; i--) {
      let l = orderedOld[i];
      if (tileCounts[l] > 0) {
        orderedNew.push(l);
        tileCounts[l]--;
      }
    }
    orderedNew.reverse();
    Object.keys(tileCounts).forEach((l) => {
      if (tileCounts[l] > 0) {
        orderedNew.push(...Array(tileCounts[l]).fill(l));
      }
    });
    setUnplayedTiles(orderedNew);
  }

  const shuffleUnplayedTiles = () => {
    let array = [...unplayedTiles];
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    setUnplayedTiles(array);
  }

  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Space') {
      shuffleUnplayedTiles();
    } else if (e.key === 'Shift') {
      unshuffleUnplayedTiles();
    }
  }

  return (
    <div onKeyDown={handleKeyDown}>
      <Rack 
        tiles={unplayedTiles}
        shuffle={shuffleUnplayedTiles}
        unshuffle={unshuffleUnplayedTiles}/>
      <Field 
        enteredValues={enteredValues}
        setEnteredValues={setEnteredValues}
        handleClear={clearField}
        handleReset={resetBoard}
        restricted={true}
        restrictedOptions={unplayedTiles} />
    </div>
  );

}
export default Board;
