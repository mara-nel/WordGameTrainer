import { useState } from "react";
import shortJQXZs from "./wordLists/shortJQXZs";
import RoundManager from "./RoundManager";

const makeAlphagram = function(word) {
    return word.split('').sort().join('');
};

const hardLetters = Object.keys(shortJQXZs);

const shortJQXZsMaster = {}
hardLetters.forEach(letter => shortJQXZsMaster[letter] = {});

Object.keys(shortJQXZsMaster).forEach( letter => {
  shortJQXZs[letter].forEach(word => {
    let alph = makeAlphagram(word);
    if (shortJQXZsMaster[letter][alph]) {
      shortJQXZsMaster[letter][alph].push(word);
    } else {
      shortJQXZsMaster[letter][alph] = [word];
    }
  });
});

const ShortJQXZs = () => {

  const [hardLetter, setHardLetter] = useState('j');

  let hardLetterOptions = [];
  Object.keys(shortJQXZs).forEach(function(l) {
    hardLetterOptions.push(
      <option key={l} value={l}>{l.toUpperCase()}</option>
    );
  });

  const switchLetter = (event) => {
    setHardLetter(event.target.value);
  }

  return (
    <div>
      <div className="subtitle">practice your short J/Q/X/Z words</div>
      <label>Short  
        <select 
          onChange={switchLetter}
          value={hardLetter}
          >
          {hardLetterOptions}
        </select> Words
      </label>
      <RoundManager
        masterWords={shortJQXZsMaster[hardLetter]}
        rounds={Object.keys(shortJQXZsMaster[hardLetter]).sort()}
        roundsSelectable={false}
        roundMessage={'Alphagram: '}
        tilesFirst={false}
        tiles="" />
    </div>
  );
}

export default ShortJQXZs;
