import React from "react";
// import { useEffect } from "react";
import Tile from "./Tile.js";
import "./Field.css";

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

const Field = React.forwardRef(({
    restricted, 
    restrictedOptions, 
    enteredValues, 
    playTile, 
    handleClear, 
  //  handleReset, 
    focus,
    setFocus,
    unPlayTile
  }, ref) => {

  //const fieldRefs = useRef(Array(enteredValues.length));
  const fieldRefs = ref;

    /*
  useEffect(() => {
    let isEmpty = true;
    enteredValues.forEach(l => {if (l!=='') { isEmpty = false }} );
    if (isEmpty) {
      fieldRefs.current[0]?.focus();
    }
  }, [enteredValues]);
    */

  const handleInput = (event) => {
    let key = parseInt(event.target.getAttribute("data-order"));
    let value = event.target.value.toLowerCase();
 
    if (validValue(value)) {
      playTile(value, restrictedOptions.indexOf(value), key);
      //updateEnteredValues(key, value);
      goToNextSlot(key);
    }
  }

  const goToNextSlot = (startingIndex) => {
    if (startingIndex !== enteredValues.length - 1) {
      let nextInputIndex = getNextInputIndex(startingIndex);
      if (nextInputIndex !== -1) {
        fieldRefs.current[nextInputIndex]?.focus();
        //fieldRefs.current[nextInputIndex]?.select();
      }
    } else {
      setFocus(-1);
    }
  }

  const validValue = (value) => {
    if (restricted) {
      if (!restrictedOptions.includes('*')) {
        return restrictedOptions.includes(value);
      } else {
        return isLetter(value);
      }
    } else {
      return isLetter(value);
    }
  }

  /*
  const updateEnteredValues = (index, value) => {
    let values = [...enteredValues];
    values[index] = value;

    setEnteredValues(values);

    if (index !== enteredValues.length - 1) {
      let nextInputIndex = getNextInputIndex(index);
      if (nextInputIndex !== -1) {
        fieldRefs.current[nextInputIndex]?.focus();
        //fieldRefs.current[nextInputIndex]?.select();
      }
    }
  }
  */
  const getNextInputIndex = (index) => {
    let laterLocations = [...enteredValues].slice(index + 1);

    return laterLocations.indexOf('') + index + 1;
  }

  const handleKeyDown = (e) => {
    let index = parseInt(e.target.getAttribute("data-order"));
    if (e.key === 'Backspace') {
      let values = [...enteredValues];
      if (index > 0 && !e.target.value) {
        if (values[index - 1] !== '') {
          values[index - 1] = '';
          unPlayTile(enteredValues[index - 1], index -1);
        }
        setFocus(index-1);
      }
    }
  }

  const selectInput = (e) => {
    e.target.select();
  }


  let rows = [];
  for (let i=0; i < enteredValues.length; i++) {
      if (enteredValues[i] !== '') {
    rows.push(
      <Tile 
        key={i} 
        ref={el => fieldRefs.current[i] = el}
        letter={enteredValues[i]} 
        isWild={enteredValues[i] === '*' }
        input={true}
        handleClick={() => unPlayTile(enteredValues[i], i )} />
    );
      } else {
    rows.push(
      <input 
        ref={el => fieldRefs.current[i] = el}
        className={focus === i ? 'focused' : ''}
        type="text" 
        key={i}
        maxLength="1" 
        data-order={i}
        autoComplete="new-password"
        onFocus={() => setFocus(i)}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onClick={selectInput}
        value={enteredValues[i]}
      />);
      }
  }

  return (
    <div>
      <form className={"elevated"} id="field" >
        {rows}
      </form>
      <div className="buttonWrapper">
        <button 
          type="button" 
          onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
});

export default Field;
