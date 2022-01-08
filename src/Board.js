import { useState, useEffect, useRef } from "react";
import Rack from "./Rack";
import Field from "./Field";

const Board = ({tiles, boardState, setBoardState, checkWord }) => {

  const [fieldFocus, setFieldFocus] = useState(-1);
  const fieldRefs = useRef(Array(boardState.field.length));

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    //console.log('event listener added');

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [boardState, fieldFocus]);

  useEffect(() => {
    if (fieldFocus > -1) {
      fieldRefs.current[fieldFocus]?.focus();
    }
  }, [fieldFocus]);

  useEffect(() => {
    if (!boardState.field.includes('')) {
      checkWord(getWordFromEnteredValues());
      setFieldFocus(-1);
    }
  }, [boardState]);


  const getWordFromEnteredValues = () => {
    let word = '';
    boardState.field.forEach( l => word += l);
    return word;
  }


  const resetBoard = () => {
    setBoardState({
      rack: Array.from(tiles),
      field: Array(boardState.field.length).fill('')
    });

    //fieldRefs.current[0]?.focus();
    setFieldFocus(-1);
  }

  const clearField = () => {
    let enteredLetters = boardState.field.filter(l => l !== '');
    // fails when * is the value of something on the field
    let processedLetters = enteredLetters.map(l => isWild(l) ? '*' : l);
    setBoardState({
      rack: [...boardState.rack, ...processedLetters],
      field: Array(boardState.field.length).fill('')
    });
    //fieldRefs.current[0]?.focus();
    setFieldFocus(-1);
  }

  /*
  const syncTiles = () => {
    const tileCounts = {};
    Array.from(tiles).forEach(l => tileCounts[l] 
      ? tileCounts[l]++ 
      : tileCounts[l] = 1);
    let enteredLetters = boardState.field.filter(l => l !== '');
    enteredLetters.forEach(l =>  tileCounts[l] 
      ? tileCounts[l]--
      : tileCounts['*']--); //assumes input restriction working
    let orderedNew = [];
    let orderedOld = boardState.rack;
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

    setBoardState({
      rack: orderedNew,
      field: [...boardState.field]
    });
  }
  */
  
  // doesnt handle wildcards
  const playTile = (letter, rackIndex, fieldIndex?) => {
    let newRack = [...boardState.rack];
    newRack.splice(rackIndex, 1);

    let newField = [...boardState.field];
    if (fieldIndex !== undefined) {
      newField[fieldIndex] = letter;
    } else {
      if (fieldFocus >= 0) {
        newField[fieldFocus] = letter;
        setFieldFocus(-1);
      } else {
        let firstEmpty = boardState.field.indexOf('');
        if (firstEmpty > -1) { 
          newField[firstEmpty] = letter;
        }
      }
    }

    setBoardState({
      rack: newRack,
      field: newField
    });
  }

  //doesnt handle wildcards
  // * doesn't preserve wildcards
  const unPlayTile = (letter, fieldIndex) => {
    let newRack = [
      ...boardState.rack, 
      isWild(letter) ? '*' : letter
    ];
    let newField = [...boardState.field];
    newField[fieldIndex] = '';

    setBoardState({
      rack: newRack,
      field: newField
    });
  }

  const isWild = (letter) => {
    let frequencyInTiles = Array.from(tiles).filter(l => l===letter).length;
    let frequencyInRack = boardState.rack.filter(l => l===letter).length
    return frequencyInTiles - frequencyInRack === 0;
  }

  const shuffleRack = () => {
    let array = [...boardState.rack];
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    setBoardState({
      ...boardState,
      rack: array
    });
  }

  const unshuffleRack = () => {
    let remaining = Array.from(tiles);
    let enteredLetters = boardState.field.filter(l => l !== '');
    enteredLetters.forEach(function(c) {
      let i = remaining.indexOf(c);
      if (i > -1) {
        remaining.splice(i, 1);
      } else if (remaining.includes('*')) {
        remaining.splice(remaining.indexOf('*'), 1);
      }
    });

    setBoardState({
      ...boardState,
      rack: remaining
    });
  }

  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Space') {
      shuffleRack();
      //console.log('space');
    } else if (e.key === 'Shift') {
      unshuffleRack();
      //console.log('shift');
    } else if (e.key === 'Enter') {
      if (boardState.rack.length === 0) {
        resetBoard();
      }
    } else if (e.key === 'Backspace') {
      if (!boardState.field.includes('')) {
        unPlayTile(boardState.field[boardState.field.length-1], boardState.field.length-1);
        setFieldFocus(boardState.field.length-1);
      }
    } else if (boardState.rack.includes(e.key)) {
      //console.log(e.key,fieldFocus, boardState.field[0]);
      if (fieldFocus === -1) {
        fieldRefs.current[boardState.field.indexOf('')]?.focus();
      }
    }
  }

  return (
    <div>
      <Rack 
        reset={resetBoard}
        tiles={boardState.rack}
        shuffle={shuffleRack}
        playTile={playTile}
        unshuffle={unshuffleRack}/>
      <Field 
        ref={fieldRefs}
        enteredValues={boardState.field}
        handleClear={tiles.includes('*') ? resetBoard : clearField}
        playTile={playTile}
        unPlayTile={unPlayTile}
        focus={fieldFocus}
        setFocus={setFieldFocus}
        restricted={true}
        restrictedOptions={boardState.rack} />
    </div>
  );

}
export default Board;
