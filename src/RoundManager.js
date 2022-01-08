import { useState, useEffect, useRef } from "react";
import Board from "./Board";
import FoundWordsList from "./FoundWordsList";
import Pop from "./sounds/zapsplat_pop.mp3";
import Bell from "./sounds/zapsplat_bell.mp3";


const initDictionary = () => {
  window.localStorage.setItem(
    'definedWords', 
    JSON.stringify({})
  );

 return {}
}

export const defaultDictionary = 
  window.localStorage.getItem('definedWords')
  ? JSON.parse(window.localStorage.getItem('definedWords'))
  : initDictionary();

const RoundManager = ({masterWords, rounds, roundsSelectable, tiles, tilesFirst, roundMessage}) => {
  const [roundTiles, setRoundTiles] = useState(rounds[0]);
  const [foundWords, setFoundWords] = useState([]);
  const [roundsFoundWords, setRoundsFoundWords] = useState([]);
  const [boardState, setBoardState] = useState({
    rack  : Array.from(tilesFirst ? tiles + roundTiles : roundTiles + tiles),
    field : Array(tiles.length + roundTiles.length).fill('')
  });

  const [dictionary, setDictionary] = useState(defaultDictionary);

  const nextRoundRef = useRef(null);
  //console.log(masterWords, rounds, roundTiles, masterWords[roundTiles]);

  useEffect(() => {
    setBoardState({
      rack  : Array.from(tilesFirst ? tiles + roundTiles : roundTiles + tiles),
      field : Array(tiles.length + roundTiles.length).fill('')
    });

    setRoundsFoundWords([]);
    console.log('cleared field, reset found words, reset rack');
  }, [tiles, roundTiles, tilesFirst]);

  useEffect(() => {
    setRoundTiles(rounds[0]);
  }, [tiles, rounds, masterWords]);

  useEffect(() => {
    if (roundsFoundWords.length === masterWords[roundTiles]?.length) {
      nextRoundRef.current?.focus();
      var audio = new Audio(Bell);
      audio.volume = 0.2;
      audio.play();
    }
  }, [roundsFoundWords, roundTiles, masterWords]);

  useEffect(() => {
    window.localStorage.setItem(
      'definedWords', 
      JSON.stringify(dictionary)
    );
  }, [dictionary]);


  const wordsBeingSearchedFor = () => {
    return masterWords[roundTiles];
  }

  const showUnfoundWords = () => {
    let unfoundWords = wordsBeingSearchedFor().filter(
      word => !roundsFoundWords.includes(word)
    );
    let undefinedWords = unfoundWords.filter(
      word => !dictionary[word]
    );
    handleUndefinedWords(undefinedWords);

    let preppedUnfoundWords = unfoundWords.map((word, i) => {
      return {
        'word': word,
        'id': foundWords.length + i,
        'found': false
      }
    });

    addFoundWords(preppedUnfoundWords);

    setRoundsFoundWords([
      ...roundsFoundWords, 
      ...unfoundWords
    ]);
  }

  const addFoundWords = (words) => {
    setFoundWords([
      ...words,
      ...foundWords
    ]);
  }

  const handleUndefinedWords = (words) => {
    let promises = words.map(word => defineWord(word));
    Promise.all(promises).then((definitions) => {
      let newDefinitions = Object.assign({}, ...definitions);
      setDictionary({
        ...dictionary,
        ...newDefinitions
      });
    });
  }
  
  const checkWord = (word) => {
    let valid = wordsBeingSearchedFor().includes(word);
    if (valid && !roundsFoundWords.includes(word)) {
      newWordFound(word);
    }
  }

  const newWordFound = (word) => {
    var audio = new Audio(Pop);
    audio.volume = 0.2;
    audio.play();

    if (!dictionary[word]) {
      handleUndefinedWords([word]);
    }

    setFoundWords([
      {
        'word': word,
        'id': foundWords.length,
        'found': true
      },
      ...foundWords
    ]);
    setRoundsFoundWords([...roundsFoundWords, word]);
  }


  const defineWord = (word) => {
    return new Promise((resolve, reject) => {
      fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word)
        .then(response => response.json())
        .then(function(data) {
          let definition = '';
          if (Array.isArray(data)) {
            //assume definition found
            definition = data[0].meanings[0].definitions[0].definition;
          } else {
            //assume no definition found
            definition = 'definition unavailable';
          }
          resolve({[word]: definition});
        });
    });
  }

  const handleYield = () => {
    showUnfoundWords();
  }

  const handleRoundSelect = (e) => {
    setRoundTiles(e.target.value);
  }

  const goToNextRound = () => {
    setRoundsFoundWords([]);
    let index = rounds.indexOf(roundTiles);
    setRoundTiles(index !== rounds.length -1 ? rounds[index + 1] : rounds[0]);
    nextRoundRef.current?.blur();
  }

  return (
    <div>
      <section>
        <div id="roundProgressWrapper">
          <p>
            {roundMessage}
            { roundsSelectable === true
              ? <select
                  value={roundTiles}
                  onChange={handleRoundSelect}
                  >
                  {rounds.map(round => <option key={round} value={round}>{round.toUpperCase()}</option>)}
                </select>
              : roundTiles.toUpperCase()
            }
          </p>

          <p>Progress: {roundsFoundWords.length} of {masterWords[roundTiles]?.length}</p>
        </div>
        <div className="buttonWrapper">
          <button 
            type="button" 
            disabled={roundsFoundWords.length === masterWords[roundTiles]?.length}
            onClick={handleYield}>
              I Yield
          </button>
          <button 
            type="button" 
            id="nextLetter"
            ref={nextRoundRef}
            disabled={roundsFoundWords.length !== masterWords[roundTiles]?.length}
            onClick={goToNextRound}>
              Next Letter
          </button>
        </div>
      </section>
      <Board 
        tiles={tilesFirst ? tiles + roundTiles : roundTiles + tiles} 
        checkWord={checkWord} 
        boardState={boardState}
        setBoardState={setBoardState} />
      <FoundWordsList 
        words={foundWords}
        dictionary={dictionary} />

    </div>
  );
}

export default RoundManager;
