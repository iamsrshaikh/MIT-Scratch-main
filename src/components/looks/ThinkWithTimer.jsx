import React, { useState } from "react";
import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";

const ThinkWithTimer = ({ comp_id }) => {
  const [state, setState] = useState({
    show_msg: false,
    timer_message: "",
    timer_for_msg: 0,
  });

  const character = useSelector((state) => state.character);

  const displayMessage = () => {
    const el = document.getElementById(`${character.active}-message-box`);
    const el2 = document.getElementById(`${character.active}-message-box1`);

    if (state.show_msg) {
      setState((prevState) => ({ ...prevState, show_msg: false }));
      el.style.display = "none";
      el2.style.display = "none";
      return;
    }

    setState((prevState) => ({ ...prevState, show_msg: true }));
    el.style.display = "inline-block";
    el.style.position = "relative";

    el2.style.display = "block";
    el2.style.position = "relative";

    el.innerHTML = state.timer_message;

    window.setTimeout(() => {
      setState((prevState) => ({ ...prevState, show_msg: false }));
      el.style.display = "none";
      el2.style.display = "none";
    }, state.timer_for_msg * 1000);
  };

  return (
    <Paper elevation={3}>
      <div className="rounded text-center bg-purple-700 p-2 my-3">
        <div className="grid grid-cols-2 my-2">
          <div className="text-white">Message</div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="text"
            value={state.timer_message}
            onChange={(e) => {
              e.target.value.length > 0 &&
                setState((prevState) => ({ ...prevState, timer_message: e.target.value }));
            }}
          />
        </div>
        <div className="grid grid-cols-2 my-2">
          <div className="text-white">Timer:</div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="number"
            value={state.timer_for_msg}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              value > 0 &&
                setState((prevState) => ({ ...prevState, timer_for_msg: value }));
            }}
          />
        </div>
        <div
          id={comp_id}
          className="flex flex-row flex-wrap text-center bg-purple-900 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={displayMessage} // Simplified event handler
        >
          {`Think ${state.timer_message}`}
        </div>
      </div>
    </Paper>
  );
};

export default ThinkWithTimer;
