const bingoStems = {
  'tisane' : {
    a : ['entasia', 'taenias'],
    b : ['banties', 'basinet'],
    c : ['acetins', 'cineast'],
    d : ['destain', 'detains', 'instead', 'nidates', 
        'sainted', 'satined', 'stained'],
    e : ['etesian'],
    f : ['fainest'],
    g : ['easting', 'eatings', 'genista', 'ingates', 
        'ingesta', 'seating', 'tagines', 'teasing'],
    h : ['sheitan', 'sthenia'],
    i : ['isatine'],
    j : ['tajines'],
    k : ['intakes'],
    l : ['elastin', 'entails', 'nailset', 'salient',
        'saltine', 'slainte', 'tenails'],
    m : ['etamins', 'inmates', 'tameins'],
    n : ['inanest', 'stanine'],
    o : ['atonies'],
    p : ['panties', 'patines', 'sapient', 'spinate'],
    q : [],
    r : ['anestri', 'antsier', 'nastier', 'ratines', 
        'retains', 'retinas', 'retsina', 'stainer', 
        'stearin'],
    s : ['entasis', 'nasties', 'seitans', 'sestina',
        'tansies', 'tisanes'],
    t : ['instate', 'satinet'],
    u : ['aunties', 'sinuate'],
    v : ['naivest', 'natives', 'vainest'],
    w : ['tawnies', 'waniest'],
    x : ['antisex', 'sextain'],
    y : [],
    z : ['zaniest', 'zeatins']
  },
  'satire' : {
    a : ['aristae', 'asteria', 'atresia'],
    b : ['baiters', 'barites', 'rebaits', 'terbias'],
    c : ['atresic', 'cristae', 'raciest', 'stearic'],
    d : ['aridest', 'astride', 'diaster', 'disrate', 
        'staider', 'tardies', 'tirades'],
    e : ['aeriest', 'seriate'],
    f : ['fairest'],
    g : ['aigrets', 'gaiters', 'seagirt', 'stagier', 
        'triages'],
    h : ['hastier'],
    i : ['airiest'],
    j : [],
    k : [],
    l : ['realist', 'retails', 'saltier', 'saltire',
        'slatier', 'tailers'],
    m : ['imarets', 'maestri', 'misrate', 'smartie'],
    n : ['anestri', 'antsier', 'nastier', 'ratines', 
        'retains', 'retinas', 'retsina', 'stainer', 
        'stearin'],
    o : [],
    p : ['parties', 'pastier', 'piaster', 'piastre',
        'pirates', 'praties', 'traipse'],
    q : [],
    r : ['artsier', 'tarries', 'tarsier'],  
    s : ['artsies', 'satires'],
    t : ['artiest', 'artiste', 'attires', 'iratest', 
        'ratites', 'striate', 'tastier'],
    u : [],
    v : ['raviest', 'vastier', 'veritas'],
    w : ['waister', 'waiters', 'wariest', 'wastrie'],
    x : [],
    y : [],
    z : []
  },
  'retina' : {
    a : [],
    b : [],
    c : ['ceratin', 'certain', 'creatin', 'tacrine'],
    d : ['antired', 'detrain', 'trained'],
    e : ['arenite', 'retinae', 'trainee'],
    f : ['fainter'],
    g : ['granite', 'gratine', 'ingrate', 'tangier',
        'tearing'],
    h : ['hairnet', 'inearth', 'therian'],
    i : ['inertia'],
    j : [],
    k : ['keratin'],
    l : ['latrine', 'ratline', 'reliant', 'retinal', 
        'trenail'],
    m : ['minaret', 'raiment'],
    n : ['entrain', 'trannie'],
    o : [],
    p : ['painter', 'pertain', 'repaint'], 
    q : [],
    r : ['retrain', 'terrain', 'trainer'],
    s : ['anestri', 'antsier', 'nastier', 'ratines', 
        'retains', 'retinas', 'retsina', 'stainer', 
        'stearin'],
    t : ['intreat', 'iterant', 'nattier', 'nitrate',
        'tertian'],
    u : ['ruinate', 'taurine', 'uranite', 'urinate'],
    v : [],
    w : ['tawnier', 'tinware'],
    x : [],
    y : [],
    z : []
  }
};

const dictionary = (function() {
  let definedWords = {};
  function initDictionary() {
    if (window.localStorage.getItem('definedWords')) {
      definedWords = JSON.parse(window.localStorage.getItem('definedWords'));
    } else {
      saveDictionary();
    }
  };
  initDictionary();

  function saveDictionary() {
    window.localStorage.setItem(
      'definedWords', 
      JSON.stringify(definedWords)
    );
  }
  function hasDefinition(word) {
    return Object.keys(definedWords).includes(word);
  }
  function getDefinition(word) {
    return definedWords[word];
  }
  function addDefinition(word, definition) {
    definedWords[word] = definition;
    saveDictionary();
  }

  return {
    hasDefinition: function(word) {
      return hasDefinition(word);
    },
    getDefinition: function(word) {
      return getDefinition(word);
    },
    addDefinition: function(word, definition) {
      addDefinition(word, definition);
    }
  }
})();

const stemMang = (function(initialStem) {
  let currentStem = initialStem;
  function setCurrentStemToSelection() {
    currentStem = document.getElementById('stemSelect').value;
  }

  return {
    value: function() {
      return currentStem;
    },
    setToSelection: function() {
      setCurrentStemToSelection();
    }
  }
})(Object.keys(bingoStems)[0]);

const letterMang = (function() {
  let currentLetter = 'a';
  let alphabet = 'abcdefghijklmnopqrstuvwxyz';
  
  function reset() {
    currentLetter = 'a';
  }
  function advance() {
    currentLetter = alphabet[alphabet.indexOf(currentLetter) + 1];
  }

  return {
    value: function() {
      return currentLetter;
    },
    reset: function() {
      reset();
    },
    advance: function() {
      advance();
    }
  }
})();

const roundMang = (function() {
  let wordsFound = [];
  function reset() {
    wordsFound = [];
  }
  function addWord(word) {
    wordsFound.push(word);
  }

  return {
    foundWords: function() {
      return wordsFound;
    },
    resetFoundWords: function() {
      reset();
    },
    addWord: function(word) {
      addWord(word);
    },
    hasWordBeenFound: function(word) {
      return wordsFound.includes(word);
    }
  }
})();


// refs globals: bingoStems
function initStemSelect() {
  let stems = Object.keys(bingoStems);
  let select = document.getElementById('stemSelect');
  stems.forEach(function(stem) {
    let option = document.createElement('option');
    option.value = stem;
    option.innerHTML = stem;
    select.appendChild(option);
  });
}

initStemSelect();

document.getElementById('stemSelect').addEventListener('change', function() {
  switchStem();
});
document.getElementById('shuffle').addEventListener('click', function() {
  shuffleRack();
});
document.getElementById('unShuffle').addEventListener('click', function() {
  unShuffleRack();
});
document.getElementById('yield').addEventListener('click', function() {
  yield();
});
document.getElementById('nextLetter').addEventListener('click', function() {
  goToNextLetter();
});
document.getElementById('clear').addEventListener('click', function() {
  clearField();
});


function switchStem() {
  stemMang.setToSelection();
  letterMang.reset();
  resetForNewLetter();
  resetForNewStem();
  unShuffleRack();
}



// refs globals: bingoStems 
function wordsBeingSearchedFor() {
  return bingoStems[stemMang.value()][letterMang.value()];
}


resetForNewLetter();


function initInputListeners() {
  const inputs = document.querySelectorAll('#field input');
  inputs.forEach(function(input, key) {
    // clicking input selects content so that typing a letter replaces it
    input.addEventListener('click', function() {
      input.select();
    });
    // checks if inputted char is valid, if it is it progress to next input 
    input.addEventListener('input', function() {
      if(isValidValue(input.value)) {
        hideTile(input.value);
        if (key !== inputs.length - 1) {
          inputs[key + 1].focus();
          inputs[key + 1].select();
        } else {
          checkWord();
        }
      } else {
        input.value = '';
      }
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Backspace' && !input.value && key > 0) {
          inputs[key - 1].focus();
          inputs[key - 1].select();
          syncPlayedTiles();
      }
      if (key === inputs.length - 1 && e.key === 'Enter') {
        clearField();
      }
    });
  });
}

initInputListeners();

function getInputtedWord() {
  let inputs = document.querySelectorAll('#field input');
  let word = '';
  for ( let i=0; i < inputs.length; i++) {
    word += inputs[i].value;
  }
  return word.toLowerCase();
}
function areAllInputsNonEmpty() {
  let inputs = document.querySelectorAll('#field input');
  let allNonEmpty = true;
  inputs.forEach(function(input) {
    if (!input.value || input.value === ' ') {
      allNonEmpty = false;
    }
  });
  return allNonEmpty;
}
function clearField() {
  let inputs = document.querySelectorAll('#field input');
  inputs.forEach(input => input.value = '');
  inputs[0].focus();

  resetPlayedTiles();
}


function syncPlayedTiles() {
  resetPlayedTiles();
  let toRemove = Array.from(getInputtedWord());
  toRemove.pop(); // pop because inputted word has an extra letter when syncPlayedTiles is triggered from backspace, so this causes other issues
  toRemove.forEach(c => hideTile(c));
}

function resetPlayedTiles() {
  document.querySelectorAll('kbd.played').forEach(tile => tile.classList.remove('played'));
}

function hideTile(value) {
  let unplayedTiles = document.querySelectorAll('kbd:not(.played).tile');
  for (let i = 0; i < unplayedTiles.length; i++) {
    if (unplayedTiles[i].innerHTML === value.toLowerCase()) {
      unplayedTiles[i].classList.add('played');
      break;
    }
  }
}


function isValidValue(value) {
  // inputtedWord will include incoming value
  // add it to validLetters to cancel it out
  let validLetters = 
    Array.from(stemMang.value() + letterMang.value() + value);
  let inputtedWord = Array.from(getInputtedWord());
  Array.from(inputtedWord).forEach(function(c) {
    validLetters.splice(validLetters.indexOf(c), 1);
  });
  return validLetters.includes(value);
}



function shuffleRack() {
  let rack = document.querySelector('section#rack');
  for (let i = rack.children.length; i >= 0; i--) {
    rack.appendChild(rack.children[Math.random() * i | 0]);
  }
}

function unShuffleRack() {
  var sortByDataOrder = function(a, b) {
    return a.dataset.order.localeCompare(b.dataset.order);
  }

  let rack = document.querySelector('section#rack');
  let rackArray = Array.prototype.slice.call(rack.children);
  rackArray.sort(sortByDataOrder);
  for (let i=0; i < rackArray.length; i++) {
    let detatchedTile = rack.removeChild(rackArray[i]);
    rack.appendChild(detatchedTile);
  }
}



function showUnfoundWords() {
  wordsBeingSearchedFor().forEach(word => {
    if (!roundMang.hasWordBeenFound(word)) {
      if (dictionary.hasDefinition(word)) {
        addMissedWordToDOM(word);
      } else {
        defineWord(word).then(definition => {
          dictionary.addDefinition(word, definition);
          addMissedWordToDOM(word);
        });
      }
      roundMang.addWord(word);
      updateProgressTracker();
    }
  });

}

function updateProgressTracker() {
  document.getElementById('currentProgress').innerHTML = 
    roundMang.foundWords().length + 
    ' of ' + 
    wordsBeingSearchedFor().length;
}

function yield() {
  showUnfoundWords();
  document.getElementById('nextLetter').disabled = false;
}

function checkWord() {
  if (areAllInputsNonEmpty()) {
    let inputtedWord = getInputtedWord();
    let valid = wordsBeingSearchedFor().includes(inputtedWord);
    if (valid && !roundMang.hasWordBeenFound(inputtedWord)) {
      newWordFound();
    }
  } 
}

function newWordFound() {
  let word = getInputtedWord();
  roundMang.addWord(word);

  updateProgressTracker();

  var audio = new Audio('sounds/zapsplat_pop.mp3');
  audio.play();

  if (roundMang.foundWords().length === wordsBeingSearchedFor().length) {
    markSuccess();
  }

  if (dictionary.hasDefinition(word)) {
    addFoundWordToDOM(word);
  } else {
    defineWord(word).then(definition => {
      dictionary.addDefinition(word, definition);
      addFoundWordToDOM(word);
    });
  }
}


function defineWord(word) {
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
        resolve(definition);
      });
  });
}

function addFoundWordToDOM(wordToAdd) {
  let li = document.createElement('li');
  li.innerHTML = wordToAdd + ':';
  let definition = document.createElement('span');
  definition.innerHTML = dictionary.getDefinition(wordToAdd);
  definition.classList.add('definition');
  li.appendChild(definition);
  document.getElementById('foundWords').prepend(li);
}

function addMissedWordToDOM(wordToAdd) {
  let li = document.createElement('li');
  li.innerHTML = wordToAdd + ' (missed):';
  let definition = document.createElement('span');
  definition.innerHTML = dictionary.getDefinition(wordToAdd);
  definition.classList.add('definition');
  li.appendChild(definition);
  document.getElementById('foundWords').prepend(li);
}

function markSuccess() {
  document.getElementById('nextLetter').disabled = false;
  document.getElementById('nextLetter').focus();

  var audio = new Audio('sounds/zapsplat_bell.mp3');
  audio.play();
  
};

function goToNextLetter() {
  unShuffleRack();
  letterMang.advance();
  resetForNewLetter();
}

function resetForNewStem() {
  let rack = document.getElementById('rack');
  let currentStem = stemMang.value();
  for (let i = 0; i < rack.children.length - 1; i++) {
    rack.children[i].innerHTML = currentStem[i];
  }
}


function resetForNewLetter() {
  let currentLetter = letterMang.value();
  document.getElementById('currentLetter').innerHTML = currentLetter;
  document.getElementById('blank').innerHTML = currentLetter;

  roundMang.resetFoundWords();
  let wordsToFind = wordsBeingSearchedFor();
  updateProgressTracker();
  
  clearField();
  if (wordsToFind.length !== 0) {
    document.getElementById('nextLetter').disabled = true;
  } else {
    markSuccess();
  }
}



/*
let tiles = document.querySelectorAll('#rack kbd');

for (let i=0; i < tiles.length; i++) {
  dragElement(tiles[i]);
}

function dragElement(elmnt) {
  let pos1 = 0;
  let pos2 = 0; 
  let pos3 = 0; 
  let pos4 = 0;

  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

*/
