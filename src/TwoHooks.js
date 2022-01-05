import twoLetterHooks from "./wordLists/twoLetterHooks";
import RoundManager from "./RoundManager";
import "./PowerStems.css";

const TwoHooks = () => {

  return (
    <div>
      <div className="subtitle">practice your two letter hooks</div>
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
