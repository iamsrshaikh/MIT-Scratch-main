import React, { useState } from "react";
import CatSprite from "./CatSprite.jsx";
import { useSelector, useDispatch } from "react-redux"; 
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { styled } from "@mui/material/styles"; // Import styled API
import { setActiveCharacter, addCharacter } from "../redux/character/characterSlice";

// Styled Components
const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: 120,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: 0,
}));

function PreviewArea() {
  const dispatch = useDispatch();
  const character = useSelector((state) => state.character);
  
  const [active, setActive] = useState(character.active);
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  let elmnt = null;

  function dragMouseDown(e, id) {
    elmnt = document.getElementById(id);
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }

  const handleChange = (e) => {
    const selectedCharacterId = e.target.value;
    setActive(selectedCharacterId);
    dispatch(setActiveCharacter(selectedCharacterId));
  };

  return (
    <div className="w-full flex-none h-full overflow-y-auto p-3" id="preview_area">
      <div className="flex justify-between mb-10">
        <div className="font-bold mb-5 text-center border border-2 rounded text-white bg-green-400 p-2 w-auto">
          Preview Area
        </div>
        <div>
          <StyledFormControl>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              Active
            </InputLabel>
            <Select
              labelId="demo-simple-select-placeholder-label-label"
              id="demo-simple-select-placeholder-label"
              value={active}
              onChange={handleChange}
              displayEmpty
            >
              {character.characters.map((x, i) => {
                const first = x.id.charAt(0).toUpperCase();
                const name = first + x.id.substr(1);

                return (
                  <MenuItem key={i} value={x.id}>
                    {name}
                  </MenuItem>
                );
              })}
            </Select>
          </StyledFormControl>
        </div>

        <div>
          <StyledButton
            variant="contained"
            color="secondary"
            startIcon={<AddCircleIcon />}
            onClick={() => dispatch(addCharacter())}
          >
            Create
          </StyledButton>
        </div>
      </div>
      <div className="flex justify-around h-full">
        {character.characters.map((x, i) => {
          return (
            <div
              id={`${x.id}-${i}`}
              key={i}
              className={`absolute`}
              onMouseDown={(e) => dragMouseDown(e, `${x.id}-${i}`)}
            >
              <div id={`${x.id}-div`} className="character">
                <div
                  className="hidden border-2 p-2 ml-3 mb-2 w-auto whitespace-nowrap"
                  id={x.id + "-message-box"}
                ></div>
                <div
                  className="hidden rounded-full border-2 w-4 left-1/2 h-4 ml-3 mb-2 whitespace-nowrap"
                  id={x.id + "-message-box1"}
                ></div>
                <CatSprite charac_id={x.id} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PreviewArea;
