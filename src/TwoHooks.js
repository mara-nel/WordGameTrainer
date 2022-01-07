import twoLetterHooks from "./wordLists/twoLetterHooks";
import RoundManager from "./RoundManager";

const TwoHooks = () => {

  return (
    <div>
      <div className="subtitle">practice your hooks for two letter words</div>
      <RoundManager
        masterWords={twoLetterHooks}
        rounds={Object.keys(twoLetterHooks)}
        roundsSelectable={true}
        roundMessage={'Contains:'}
        tilesFirst={false}
        tiles="*" />
    </div>
  );
}

export default TwoHooks;
