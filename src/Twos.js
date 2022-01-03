import { useState, useEffect } from "react";
import Field from "./Field";
import Board from "./Board";
import FoundWordsList from "./FoundWordsList";
import twoLetterWords from "./twoLetterWords";
import "./PowerStems.css";

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

const PowerStems = () => {
  const [currentLetter, setCurrentLetter] = useState('a');
  const [foundWords, setFoundWords] = useState([]);
  const [enteredValues, setEnteredValues] = useState(Array(2).fill(''));
  const [roundsFoundWords, setRoundsFoundWords] = useState([]);
  const [roundComplete, setRoundComplete] = useState(false);

  const [dictionary, setDictionary] = useState(defaultDictionary);


  useEffect(() => {
    clearField();
    setRoundsFoundWords([]);
  }, [currentLetter]);


  useEffect(() => {
    if (roundsFoundWords.length === wordsBeingSearchedFor().length) {
      setRoundComplete(true);
      document.getElementById('nextLetter').focus();
      var audio = new Audio('sounds/zapsplat_bell.mp3');
      audio.volume = 0.2;
      audio.play();
    } else {
      setRoundComplete(false);
    }
  }, [roundsFoundWords, currentLetter]);

  // trying to put focus on a button???
  useEffect(() => {
    if (roundComplete) {
      document.getElementById('nextLetter').focus();
    }
  }, [roundComplete]);

  useEffect(() => {

  }, [foundWords]);

  useEffect(() => {
    window.localStorage.setItem(
      'definedWords', 
      JSON.stringify(dictionary)
    );
  }, [dictionary]);


  const clearField = () => {
    setEnteredValues(['','']);
    let inputs = document.querySelectorAll('#field input');
    inputs[0].focus();
  }


  const wordsBeingSearchedFor = () => {
    let roundTotalWords = twoLetterWords.filter(word => word.includes(currentLetter));
    return roundTotalWords;
  }

  const showUnfoundWords = () => {
    //let promises = [];
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

    setFoundWords([
      ...foundWords, 
      ...preppedUnfoundWords
    ]);

    setRoundsFoundWords([
      ...roundsFoundWords, 
      ...unfoundWords
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
    var audio = new Audio('sounds/zapsplat_pop.mp3');
    audio.volume = 0.2;
    audio.play();

    if (!dictionary[word]) {
      handleUndefinedWords([word]);
    }
    setFoundWords([
      ...foundWords, 
      {
        'word': word,
        'id': foundWords.length,
        'found': true
      }
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
    setRoundComplete(true);
  }
  const goToNextLetter = () => {
    setRoundsFoundWords([]);
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let newLetter = currentLetter !== 'z' 
      ? alphabet[alphabet.indexOf(currentLetter) + 1]
      : 'a';

    setCurrentLetter(newLetter);
  }

  return (
    <div>
      <div className="subtitle">practice your two letter words</div>

      <section id="challengeDetails">
        <div id="stemProgressWrapper">
          <p className="gameStatus">? = <span id='currentLetter'></span>{currentLetter}</p>
          <p className="gameStatus">Progress: <span id='currentProgress'>{roundsFoundWords.length} of {twoLetterWords.filter(word => word.includes(currentLetter)).length}</span></p>
        </div>
        <div className="buttonWrapper">
          <button 
            type="button" 
            disabled={roundComplete}
            onClick={handleYield}>
              I Yield
          </button>
          <button 
            type="button" 
            id="nextLetter"
            disabled={!roundComplete}
            onClick={goToNextLetter}>
              Next Letter
          </button>
        </div>
      </section>
      <Board 
        tiles={currentLetter + '*'} 
        checkWord={checkWord} 
        enteredValues={enteredValues} 
        setEnteredValues={setEnteredValues}/>
      <FoundWordsList 
        words={foundWords}
        dictionary={dictionary} />
    </div>
  );
}

export default PowerStems;
