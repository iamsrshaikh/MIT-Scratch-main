import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setWait } from "../../redux/events/eventSlice"; // Updated import
import Paper from "@material-ui/core/Paper";

const Wait = ({ comp_id }) => {
  const [wait, setStateWait] = useState(0);
  const events = useSelector((state) => state.event); // Accessing events from the Redux store
  const dispatch = useDispatch(); // Hook to dispatch actions

  // Set Wait value for current component
  function handleChange(e) {
    let val = parseInt(e.target.value);
    setStateWait(val);
    let curr = { ...events.wait }; // Creating a copy of the current wait object
    curr[comp_id] = val;
    dispatch(setWait(curr)); // Dispatching the action from Redux Toolkit slice
  }

  return (
    // Wait Component
    <Paper elevation={3}>
      <div className="text-center rounded bg-red-400 p-2 my-3">
        <div className="grid grid-cols-2 my-2">
          <div className="text-white">Wait</div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="number"
            value={wait}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div
          id={comp_id}
          className="text-center bg-red-600 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        >
          Wait {wait} seconds
        </div>
      </div>
    </Paper>
  );
};

export default Wait;
