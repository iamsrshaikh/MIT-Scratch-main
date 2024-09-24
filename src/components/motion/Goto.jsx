import React, { useState } from "react";
import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";

const GotoXY = ({ comp_id }) => {
  const [state, setState] = useState({
    goto_x: 0,
    goto_y: 0,
  });

  const character = useSelector((state) => state.character); 

  const gotoXY = () => {
    const el = document.getElementById(`${character.active}-div`);
    el.style.position = "relative";
    el.style.left = state.goto_x + "px";
    el.style.top = state.goto_y + "px";
  };

  return (
    <Paper elevation={3}>
      <div className="text-center rounded bg-blue-500 p-2 my-3">
        <div className="grid grid-cols-2 my-2">
          <div className="text-white"> X</div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="number"
            value={state.goto_x}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              !isNaN(value) && setState({ ...state, goto_x: value });
            }}
          />
        </div>
        <div className="grid grid-cols-2 my-2">
          <div className="text-white">Y</div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="number"
            value={state.goto_y}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              !isNaN(value) && setState({ ...state, goto_y: value });
            }}
          />
        </div>
        <div
          id={comp_id}
          className="text-center bg-blue-700 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={gotoXY} >
          Go to X : {state.goto_x} Y : {state.goto_y}
        </div>
      </div>
    </Paper>
  );
};

export default GotoXY;
