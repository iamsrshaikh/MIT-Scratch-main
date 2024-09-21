import React from "react";
import { useSelector } from "react-redux";
import Paper from "@material-ui/core/Paper";

const Show = ({ comp_id }) => {
  const character = useSelector((state) => state.character);

  const handleDisplay = () => {
    const el = document.getElementById(character.active);
    if (el) {
      el.style.display = "inline-block";
    }
  };

  return (
    <Paper elevation={3}>
      <div
        id={comp_id}
        className="rounded text-center bg-purple-700 text-white px-2 py-1 my-2 text-sm cursor-pointer mx-auto"
        onClick={handleDisplay}
      >
        Show
      </div>
    </Paper>
  );
};

export default Show;
