import React, { useState } from "react";
import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";

const MoveY = ({ comp_id }) => {
  const [steps, setSteps] = useState(0);
  const character = useSelector((state) => state.character);


  const handleClick = () => {
    const el = document.getElementById(`${character.active}-div`);

    const top = el.offsetTop;
    el.style.position = "relative";
    el.style.top = top + steps + "px";
  };

  return (
    <Paper elevation={3}>
      <div
        id={comp_id}
        className="text-center rounded bg-blue-700 text-white p-2 my-2 text-sm cursor-pointer mx-auto"
        onClick={handleClick}
      >
        Move Y{" "}
        <input
          type="number"
          className="text-black text-center w-16 mx-2"
          value={steps}
          onChange={(e) => setSteps(parseInt(e.target.value) || 0)}
        />{" "}
        steps
      </div>
    </Paper>
  );
};

export default MoveY;
