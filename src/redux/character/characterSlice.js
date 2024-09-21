import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  characters: [{ id: "sprite0", angle: 0 }],
  active: "sprite0",
};

const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    setActiveCharacter: (state, action) => {
      state.active = action.payload;
    },
    addCharacter: (state) => {
      state.characters.push({
        id: `sprite${state.characters.length}`,
        angle: 0,
      });
    },
    setCharacterAngle: (state, action) => {
      const curr_character = state.characters.find(
        (character) => character.id === state.active
      );
      if (curr_character) {
        curr_character.angle = action.payload;
      }
    },
  },
});

export const { setActiveCharacter, addCharacter, setCharacterAngle } = characterSlice.actions;
export default characterSlice.reducer;
