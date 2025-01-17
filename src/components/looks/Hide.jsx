import React from "react";
import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";

const Hide = ({ comp_id }) => {
  const character = useSelector((state) => state.character);

  const handleDisplay = () => {
    const el = document.getElementById(character.active);
    if (el) {
      el.style.display = "none";
    }
  };

  return (
    <Paper elevation={3}>
      <div
        id={comp_id}
        className="text-center rounded bg-purple-700 text-white px-2 py-1 my-2 text-sm cursor-pointer mx-auto"
        onClick={handleDisplay}
      >
        Hide
      </div>
    </Paper>
  );
};

export default Hide;
