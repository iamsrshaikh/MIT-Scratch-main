import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Paper from "@material-ui/core/Paper";

import { setRepeat } from "../../redux/events/eventSlice";

const Repeat = ({ comp_id }) => {
  const [repeat, setStateRepeat] = useState(0);
  const events = useSelector((state) => state.event)
  const dispatch = useDispatch();

  function handleChange(e) {
    let val = parseInt(e.target.value);
    setStateRepeat(val);
    let curr = { ...events.repeat };
    curr[comp_id] = val;
    dispatch(setRepeat(curr));
  }

  return (
    <Paper elevation={3}>
      <div className="rounded text-center bg-red-400 p-2 my-3">
        <div className="grid grid-cols-2 my-2">
          <div className="text-white">Repeat</div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="number"
            value={repeat}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div
          id={comp_id}
          className="text-center bg-red-600 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        >
          Repeat By {repeat}
        </div>
      </div>
    </Paper>
  );
};

export default Repeat;
