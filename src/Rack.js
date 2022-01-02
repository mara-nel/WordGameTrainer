import { useEffect } from "react";
import "./Rack.css";

const Rack = ({ tiles, playedTiles }) => {

  useEffect(() => {
    unShuffleRack();
  }, [tiles]);

  const shuffleRack = () => {
    let rack = document.getElementById('rack');
    for (let i = rack.children.length; i >= 0; i--) {
      rack.appendChild(rack.children[Math.random() * i | 0]);
    }
  }
  const unShuffleRack = () => {
    var sortByDataOrder = function(a, b) {
      return a.dataset.order.localeCompare(b.dataset.order);
    }

    let rack = document.getElementById('rack');
    let rackArray = Array.prototype.slice.call(rack.children);
    rackArray.sort(sortByDataOrder);
    for (let i=0; i < rackArray.length; i++) {
      let detatchedTile = rack.removeChild(rackArray[i]);
      rack.appendChild(detatchedTile);
    }
  }

  let rows = [];
  for (let i=0; i < tiles.length; i++) {
    rows.push(
      <kbd 
        key={i}
        className="tile" 
        data-order={`"${i}"`}
      >{tiles[i]}</kbd>);
  }

  return (
    <div>
      <div id="rack">
        {rows}
      </div>
      <div id="rackActions" className="buttonWrapper">
        <button 
          type="button" 
          onClick={shuffleRack}>Shuffle</button>
        <button 
          type="button" 
          onClick={unShuffleRack}>Unshuffle</button>
      </div>
    </div>
  );
}

export default Rack;
