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
  }
};

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

function initLocalDictionary() {
  let definedWords = {};
  if (window.localStorage.getItem('definedWords')) {
    definedWords = JSON.parse(window.localStorage.getItem('definedWords'));
  } else {
    window.localStorage.setItem('definedWords', JSON.stringify(definedWords));
  }
  
  return definedWords;
};
let definedWords = initLocalDictionary();

let currentStem = Object.keys(bingoStems)[0];
let currentLetter = Object.keys(bingoStems[currentStem])[0];
let currentlyFoundWords = [];
document.getElementById('currentStem').innerHTML = currentStem + '+?';
document.getElementById('currentLetter').innerHTML = currentLetter;
document.getElementById('blank').innerHTML = currentLetter;
document.getElementById('currentProgress').innerHTML = 
  currentlyFoundWords.length + ' of ' + bingoStems[currentStem][currentLetter].length;



const inputs = document.querySelectorAll('#field input');
const field = document.getElementById('field');

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

function syncPlayedTiles() {
  resetPlayedTiles();
  let toRemove = Array.from(getInputtedWord());
  toRemove.pop(); // pop because inputted word has an extra letter when syncPlayedTiles is triggered from backspace, so this causes other issues
  toRemove.forEach(c => hideTile(c));
}

function resetPlayedTiles() {
  document.querySelectorAll('kbd.played').forEach(tile => tile.classList.remove('played'));
}


function isValidValue(value) {
  // inputtedWord will include incoming value, so add it into valid 
  // to cancel it out
  let validLetters = Array.from(currentStem + currentLetter + value);
  let inputtedWord = Array.from(getInputtedWord());
  Array.from(inputtedWord).forEach(function(c) {
    validLetters.splice(validLetters.indexOf(c), 1);
  });
  return validLetters.includes(value);
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
  rackArray = Array.prototype.slice.call(rack.children);
  rackArray.sort(sortByDataOrder);
  for (let i=0; i < rackArray.length; i++) {
    let parent = rackArray[i].parentNode;
    let detatchedTile = parent.removeChild(rackArray[i]);
    parent.appendChild(detatchedTile);
  }
}

document.getElementById('shuffle').addEventListener('click', function() {
  shuffleRack();
});
document.getElementById('unShuffle').addEventListener('click', function() {
  unShuffleRack();
});


function checkWord() {
  if (areAllInputsNonEmpty()) {
    let inputtedWord = getInputtedWord();
    let valid = bingoStems[currentStem][currentLetter].includes(inputtedWord);
    if (valid && !currentlyFoundWords.includes(inputtedWord)) {
      updateFoundWords();
    }
  } 
}

function updateFoundWords() {
  let newWord = getInputtedWord();
  currentlyFoundWords.push(newWord);
  document.getElementById('currentProgress').innerHTML = 
    currentlyFoundWords.length + ' of ' + bingoStems[currentStem][currentLetter].length;

  var audio = new Audio('sounds/zapsplat_pop.mp3');
  audio.play();

  if (currentlyFoundWords.length === bingoStems[currentStem][currentLetter].length) {
    markSuccess();
  }

  if (definedWords[newWord]) {
    document.getElementById('foundWords').innerHTML =
      `<li>${newWord}:<span class='definition'>${definedWords[newWord]}</span></li>` +
      document.getElementById('foundWords').innerHTML;
  } else {
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+newWord)
      .then(response => response.json())
      .then(function(data) {
        console.log(data);
        let definition = '';
        if (Array.isArray(data)) {
          //assume definition found
          definition = data[0].meanings[0].definitions[0].definition;
        } else {
          //assume no definition found
          definition = 'definition unavailable';
        }
        definedWords[newWord] = definition;
        window.localStorage.setItem('definedWords', JSON.stringify(definedWords));
        document.getElementById('foundWords').innerHTML =
          `<li>${newWord}:<span class='definition'>${definition}</span></li>` +
          document.getElementById('foundWords').innerHTML;
      });
  }
  console.log(newWord, definedWords);
  //document.getElementById('foundWords').innerHTML =
  //  `<li>${newWord}</li>` + 
  //  document.getElementById('foundWords').innerHTML;
}

function markSuccess() {
  document.getElementById('nextLetter').disabled = false;
  document.getElementById('nextLetter').focus();

  var audio = new Audio('sounds/zapsplat_bell.mp3');
  audio.play();
  
};

function goToNextLetter() {
  unShuffleRack();
  currentLetter = alphabet[alphabet.indexOf(currentLetter) + 1];
  document.getElementById('currentLetter').innerHTML = currentLetter;
  document.getElementById('blank').innerHTML = currentLetter;

  currentlyFoundWords = [];
  document.getElementById('currentProgress').innerHTML = 
    currentlyFoundWords.length + ' of ' + bingoStems[currentStem][currentLetter].length;
  
  clearField();
  if (bingoStems[currentStem][currentLetter].length !== 0) {
    document.getElementById('nextLetter').disabled = true;
  } else {
    markSuccess();
  }
}

document.getElementById('nextLetter').addEventListener('click', function() {
  goToNextLetter();
});



function getInputtedWord() {
  let word = '';
  for ( let i=0; i < inputs.length; i++) {
    word += inputs[i].value;
  }
  return word.toLowerCase();
}

function areAllInputsNonEmpty() {
  let allNonEmpty = true;
  inputs.forEach(function(input) {
    if (!input.value || input.value === ' ') {
      allNonEmpty = false;
    }
  });
  return allNonEmpty;
}


document.getElementById('clear').addEventListener('click', function() {
  clearField();
});

function clearField() {
  inputs.forEach(input => input.value = '');
  inputs[0].focus();

  resetPlayedTiles();
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
