import React from "react";

const Tile = React.forwardRef(({ letter, input, handleClick, isWild }, ref) => {

  return (
    <kbd 
      ref={ref}
      className={isWild ? "tile wild" : "tile"} 
      onClick={handleClick}
    >{letter}</kbd>
  );
});

export default Tile;
