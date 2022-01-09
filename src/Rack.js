import Tile from "./Tile.js";
import "./Rack.css";

const Rack = ({ reset, tiles, shuffle, unshuffle, playTile }) => {

  return (
    <div>
      <div onClick={() => {if(tiles.length === 0) reset()}}id="rack">
        {Array.from(tiles).map((l,i) => 
          <Tile 
            letter={l} 
            key={i} 
            isWild={false}
            handleClick={() =>
              { if(l !== '*') playTile(l, i)}
            }/>)}
      </div>
      <div className="buttonWrapper">
        <button 
          type="button" 
          onClick={shuffle}>Shuffle</button>
        <button 
          type="button" 
          onClick={unshuffle}>Unshuffle</button>
      </div>
    </div>
  );
}

export default Rack;
