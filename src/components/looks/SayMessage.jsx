import React, { useState } from "react";
import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";

const SayMessage = ({ comp_id }) => {
  const [state, setState] = useState({
    show_msg: false,
    message: "",
    character_id: "",
  });

  const character = useSelector((state) => state.character);

  const displayMessage = () => {
    const el = document.getElementById(`${character.active}-message-box`);
    const el2 = document.getElementById(`${character.active}-message-box1`);

    if (state.show_msg && state.character_id === character.active) {
      setState({ ...state, show_msg: false });
      el.style.display = "none";
      return;
    }

    setState({ ...state, show_msg: true, character_id: character.active }); // Update character_id
    el.style.display = "block";
    el.style.position = "relative";

    el2.style.display = "none";

    window.clearTimeout();
    el.innerHTML = state.message;
  };

  return (
    <Paper elevation={3}>
      <div className="rounded text-center bg-purple-500 p-2 my-3">
        <div className="grid grid-cols-2 my-2">
          <div className="text-white">Message</div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="text"
            value={state.message}
            onChange={(e) => {
              e.target.value.length > 0 &&
                setState({ ...state, message: e.target.value });
            }}
          />
        </div>
        <div
          id={comp_id}
          className="flex text-center flex-row flex-wrap bg-purple-700 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={displayMessage}
        >
          {`Say ${state.message}`}
        </div>
      </div>
    </Paper>
  );
};

export default SayMessage;
