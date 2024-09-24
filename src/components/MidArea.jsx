import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { purple } from "@mui/material/colors";
import Paper from "@mui/material/Paper";

import { addList } from "../redux/midarea/listSlice"; 
import { getComponent } from "./getComponents.jsx";

// Styled Components
const StyledButton = styled(Button)(({ theme }) => ({
  margin: 0,
}));

const RunButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  fontSize: "13px",
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

const StyledPaper = styled(Paper)({
  padding: '16px',
});

function MidArea() {
  const dispatch = useDispatch();
  const area_list = useSelector((state) => state.list);
  const event_values = useSelector((state) => state.event);

  const eventFire = (el, etype) => {
    if (el && el.fireEvent) {
      el.fireEvent("on" + etype);
    } else if (el) {
      const evObj = document.createEvent("Events");
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  };

  const handleClick = (arr, id) => {
    if (arr.length === 0) return;
    let i = 0;
    let repeat = 1;

    let str1 = `comp${arr[i]}-${id}-${i}`;

    if (arr[i] === "WAIT") {
      let str2 = `comp${arr[i]}-${id}-${i}`;
      let last_time = new Date().getTime();
      let curr_time = new Date().getTime();

      while ((curr_time - last_time) / 1000 < event_values.wait[str2] - 2) {
        curr_time = new Date().getTime();
      }
    } else if (arr[i] !== "REPEAT") {
      eventFire(document.getElementById(str1), "click");
    } else {
      repeat = event_values.repeat[str1] + 1;
    }
    i++;

    const cnt = setInterval(() => {
      if (i === arr.length) {
        clearInterval(cnt);
      }

      if (arr[i] === "WAIT") {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        let last_time = new Date().getTime();
        let curr_time = new Date().getTime();

        while ((curr_time - last_time) / 1000 < event_values.wait[str2] - 2) {
          curr_time = new Date().getTime();
        }
        i++;
      } else if (arr[i] === "REPEAT") {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        repeat = repeat * (event_values.repeat[str2] + 1);
        i++;
      } else if (arr[i - 1] === "REPEAT" && repeat > 2) {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        eventFire(document.getElementById(str2), "click");
        repeat--;
      } else {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        eventFire(document.getElementById(str2), "click");
        i++;
      }
    }, 2000);
  };

  return (
    <div className="flex-1 h-full overflow-auto p-3">
      <div className="flex justify-between">
        <div className="font-bold mb-5 text-center border border-2 rounded text-white bg-green-400 p-2 w-auto">
          Mid Area
        </div>

        <div>
          <StyledButton
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => dispatch(addList())}
          >
            Add List
          </StyledButton>
        </div>
      </div>
      <div className="grid grid-flow-col">
        {area_list.midAreaLists.map((l) => (
          <div className="w-60" key={l.id}>
            <StyledPaper elevation={3}>
              <div className="w-52 border border-2 border-gray-300 p-2">
                <Droppable droppableId={l.id} type="COMPONENTS">
                  {(provided) => (
                    <ul
                      className={`${l.id} w-48 h-full`}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      <div className="text-center mx-auto my-2 mb-4">
                        <RunButton
                          variant="contained"
                          startIcon={<PlayArrowIcon />}
                          onClick={() => handleClick(l.comps, l.id)}
                        >
                          Run
                        </RunButton>
                      </div>

                      {l.comps &&
                        l.comps.map((x, i) => {
                          let str = `${x}`;
                          let component_id = `comp${str}-${l.id}-${i}`;

                          return (
                            <Draggable
                              key={`${str}-${l.id}-${i}`}
                              draggableId={`${str}-${l.id}-${i}`}
                              index={i}
                            >
                              {(provided) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {getComponent(str, component_id)}
                                  {provided.placeholder}
                                </li>
                              )}
                            </Draggable>
                          );
                        })}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </div>
            </StyledPaper>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MidArea;
