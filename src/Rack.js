import { useRef, useEffect } from "react";
import "./Rack.css";

const Rack = ({ tiles, shuffle, unshuffle }) => {

  const rackRef = useRef(null);

  useEffect(() => {
    //unShuffleRack();
    updateRack();
  }, [tiles]);


  const shuffleRack = () => {
    for (let i = rackRef.current?.children.length; i >= 0; i--) {
      rackRef.current?.appendChild(rackRef.current?.children[Math.random() * i | 0]);
    }
  }

  const unShuffleRack = () => {
    var sortByDataOrder = function(a, b) {
      return a.dataset.order.localeCompare(b.dataset.order);
    }

    let rackArray = Array.prototype.slice.call(rackRef.current?.children);
    rackArray.sort(sortByDataOrder);
    for (let i=0; i < rackArray.length; i++) {
      let detatchedTile = rackRef.current?.removeChild(rackArray[i]);
      rackRef.current?.appendChild(detatchedTile);
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
  const updateRack = () =>{
    rows = [];
    for (let i=0; i < tiles.length; i++) {
      rows.push(
        <kbd 
          key={i}
          className="tile" 
          data-order={`"${i}"`}
        >{tiles[i]}</kbd>);
    }
  }

  return (
    <div>
      <div ref={rackRef} id="rack">
        {rows}
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
