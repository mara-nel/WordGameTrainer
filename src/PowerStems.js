import { useState } from "react";
import bingoStems from "./wordLists/bingoStems";
import RoundManager from "./RoundManager";

const rounds = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

const PowerStems = () => {
  const [currentStem, setCurrentStem] = useState('tisane');

  let stemOptions = [];
  Object.keys(bingoStems).forEach(function(stem) {
    stemOptions.push(
      <option key={stem} value={stem}>{stem.toUpperCase()}</option>
    );
  });

  const switchStem = (event) => {
    setCurrentStem(event.target.value);
  }

  return (
    <div>
      <div className="subtitle">practice your power bingo stems</div>
      <label>Stem: 
        <select 
          id="stemSelect" 
          onChange={switchStem}
          value={currentStem}>
            {stemOptions}
        </select>
      </label>
      <RoundManager 
        masterWords={bingoStems[currentStem]}
        rounds={Object.keys(bingoStems[currentStem])}
        roundsSelectable={false}
        roundMessage={currentStem.toUpperCase() + ' + '}
        tilesFirst={true}
        tiles={currentStem} />
    </div>
  );
}

export default PowerStems;
