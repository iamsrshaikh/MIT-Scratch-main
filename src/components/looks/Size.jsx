import React, { useState } from "react";
import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";

const Size = ({ comp_id }) => {
  const [scale, setScale] = useState(1); 
  const character = useSelector((state) => state.character); 

  // To change Size of Sprint
  const changeSize = () => {
    const el = document.getElementById(character.active);
    if (el) {
      el.style.transform = `scale(${scale})`;
    }
  };

  return (
    <Paper elevation={3}>
      <div className="text-center rounded bg-purple-500 p-2 my-3">
        <div className="grid grid-cols-2 my-2">
          <div className="text-white">Size:</div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="number"
            value={scale}
            onChange={(e) => setScale(parseInt(e.target.value) || 1)}
          />
        </div>
        <div
          id={comp_id}
          className="text-center bg-purple-700 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={changeSize}
        >
          Size {scale}
        </div>
      </div>
    </Paper>
  );
};

export default Size;
