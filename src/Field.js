import { useEffect } from "react";
import "./Field.css";

const Field = ({length, tiles, unplayedTiles, enteredValues, setEnteredValues, handleSync}) => {

  useEffect(() => {
    handleClear();
  }, [tiles]);
  useEffect(() => {
    handleSync();
  }, [enteredValues]);

  const inputs = document.querySelectorAll('#field input');

  const handleClear = () => {
    let inputs = document.querySelectorAll('#field input');
    setEnteredValues(Array(length).fill(''));
    inputs[0].focus();
  }

  const handleInput = (event) => {
    let key = parseInt(event.target.getAttribute("data-order"));
    let values = enteredValues;
    if (unplayedTiles.includes(event.target.value.toLowerCase())) {
      values[event.target.getAttribute("data-order")] = 
        event.target.value.toLowerCase();
      if (key !== length - 1) {
        inputs[key + 1].focus();
        inputs[key + 1].select();
      }
    } 
    setEnteredValues(values);
  }
  const handleKeyDown = (e) => {
    let key = parseInt(e.target.getAttribute("data-order"));
    if (e.key === 'Backspace') {
      let values = enteredValues;
      if (key > 0 && !e.target.value) {
        values[key - 1] = '';
        inputs[key - 1].select();
      }
      values[key] = '';
      setEnteredValues(values);
    }
    else if (e.key === 'Enter') {
      if (!enteredValues.includes('')) {
        handleClear();
      }
    }
  }
  const selectInput = (e) => {
    e.target.select();
  }


  let rows = [];
  for (let i=0; i < length; i++) {
    rows.push(
      <input 
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

  const handleChange = () => {
    handleSync();
  }

  return (
    <div>
      <form id="field" onChange={handleChange}>
        {rows}
        <button 
          type="button" 
          id="clear" 
          onClick={handleClear}>Clear
        </button>
      </form>
    </div>
  );
}

export default Field;
