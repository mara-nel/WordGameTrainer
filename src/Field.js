import "./Field.css";

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

const Field = ({length, restricted, restrictedOptions, enteredValues, setEnteredValues}) => {

  const inputs = document.querySelectorAll('#field input');

  const handleClear = () => {
    let inputs = document.querySelectorAll('#field input');
    setEnteredValues(Array(length).fill(''));
    inputs[0].focus();
  }

  const handleInput = (event) => {
    let key = parseInt(event.target.getAttribute("data-order"));
    let value = event.target.value.toLowerCase();
  
    /*
    if (restricted && restrictedOptions.includes(value)) {
      updateEnteredValues(key, value);
    } else if (!restricted && isLetter(value)) {
      updateEnteredValues(key, value);
    }*/
    if (validValue(value)) {
      updateEnteredValues(key, value);
    }
  }

  const validValue = (value) => {
  
    if (restricted) {
      if (!restrictedOptions.includes('*')) {
        return restrictedOptions.includes(value);
      } else {
        return true;
      }
    } else {
      return isLetter(value);
    }
  }

  const updateEnteredValues = (index, value) => {
    let values = [...enteredValues];
    values[index] = value;

    setEnteredValues(values);

    if (index !== length - 1) {
      inputs[index + 1].focus();
      inputs[index + 1].select();
    }
  }

  const handleKeyDown = (e) => {
    let key = parseInt(e.target.getAttribute("data-order"));
    if (e.key === 'Backspace') {
      let values = [...enteredValues];
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

  return (
    <div>
      <form id="field">
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
