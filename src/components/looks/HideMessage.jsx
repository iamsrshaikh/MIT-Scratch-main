import React from "react";
import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";

const HideMessage = ({ comp_id }) => {
  const character = useSelector((state) => state.character);

  const displayMessage = () => {
    window.clearTimeout();
    const el = document.getElementById(`${character.active}-message-box`);
    const el2 = document.getElementById(`${character.active}-message-box1`);
    if (el) el.style.display = "none"; 
    if (el2) el2.style.display = "none";
  };

  return (
    <Paper elevation={3}>
      <div
        id={comp_id}
        onClick={displayMessage}
        className="rounded bg-purple-700 text-center text-white max-w-content p-1 my-3"
      >
        Hide Message
      </div>
    </Paper>
  );
};

export default HideMessage;
