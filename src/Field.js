import { useRef, useEffect } from "react";
import "./Field.css";

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

const Field = ({restricted, restrictedOptions, enteredValues, setEnteredValues, handleClear, handleReset}) => {

  const inputRefs = useRef(Array(enteredValues.length));

  useEffect(() => {
    let isEmpty = true;
    enteredValues.forEach(l => {if (l!=='') { isEmpty = false }} );
    if (isEmpty) {
      inputRefs.current[0]?.focus();
    }
  }, [enteredValues]);

  const handleInput = (event) => {
    let key = parseInt(event.target.getAttribute("data-order"));
    let value = event.target.value.toLowerCase();
  
    if (validValue(value)) {
      updateEnteredValues(key, value);
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

  const updateEnteredValues = (index, value) => {
    let values = [...enteredValues];
    values[index] = value;

    setEnteredValues(values);

    if (index !== enteredValues.length - 1) {
      inputRefs.current[index + 1]?.focus();
      inputRefs.current[index + 1]?.select();
    }
  }

  const handleKeyDown = (e) => {
    let index = parseInt(e.target.getAttribute("data-order"));
    if (e.key === 'Backspace') {
      let values = [...enteredValues];
      if (index > 0 && !e.target.value) {
        values[index - 1] = '';
        inputRefs.current[index - 1]?.select();
      }
      values[index] = '';
      setEnteredValues(values);
    } else if (e.key === 'Enter') {
      if (!enteredValues.includes('')) {
        handleReset();
      }
    }
  }

  const selectInput = (e) => {
    e.target.select();
  }


  let rows = [];
  for (let i=0; i < enteredValues.length; i++) {
    rows.push(
      <input 
        ref={el => inputRefs.current[i] = el}
        className={enteredValues[i] !== '' ? 'tile' : 'empty'}
        type="text" 
        key={i}
        maxLength="1" 
        data-order={i}
        autoComplete="new-password"
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onClick={selectInput}
        value={enteredValues[i]}
      />
    );
  }

  return (
    <div>
      <form className={"elevated"} id="field">
        {rows}
      </form>
      <div className="buttonWrapper">
        <button 
          type="button" 
          onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
}

export default Field;
