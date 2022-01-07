import twoLetterWords from "./wordLists/twoLetterWords";
import RoundManager from "./RoundManager";

const rounds = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const twoLetterWordsByLetter = {};
rounds.forEach(l => twoLetterWordsByLetter[l] = twoLetterWords.filter(word => word.includes(l)));


const Twos = () => {

  return (
    <div>
      <div className="subtitle">practice your two letter words</div>
      <RoundManager
        masterWords={twoLetterWordsByLetter}
        rounds={rounds}
        roundsSelectable={false}
        roundMessage={'Contains: '}
        tilesFirst={false}
        tiles="*" />
    </div>
  );
}

export default Twos;
