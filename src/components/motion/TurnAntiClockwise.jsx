import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"; 

import UndoIcon from "@mui/icons-material/Undo";
import Paper from "@mui/material/Paper";

import { setCharacterAngle } from "../../redux/character/characterSlice";

const TurnAntiClockWise = ({ comp_id }) => {
  const [angle, setAngle] = useState(0);
  const dispatch = useDispatch();
  const character = useSelector((state) => state.character); 

  const handleClick = () => {
    let anti_angle = -1 * angle;
    const el = document.getElementById(character.active);
    const character_angle = character.characters.find(
      (x) => x.id === character.active
    );
    if (character_angle) {
      el.style.transform = `rotate(${character_angle.angle + anti_angle}deg)`;
      dispatch(setCharacterAngle(character_angle.angle + anti_angle)); // Dispatch updated angle
    }
  };

  return (
    <Paper elevation={3}>
      <div className="text-center rounded bg-blue-500 p-2 my-3">
        <div className="grid grid-cols-2">
          <div className="text-white">Rotate By:</div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="number"
            value={angle}
            onChange={(e) => {
              setAngle(parseInt(e.target.value));
            }}
          />
        </div>
        <div
          id={comp_id}
          className={`flex bg-blue-700 text-white px-2 py-1 mt-3 mb-1 text-sm cursor-pointer`}
          onClick={() => handleClick()}
        >
          <div className="flex mx-auto">
            Turn
            <UndoIcon className="mx-2" />
            {angle} degrees
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default TurnAntiClockWise;
