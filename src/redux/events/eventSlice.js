import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  repeat: {},
  wait: {},
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setRepeat: (state, action) => {
      state.repeat = action.payload;
    },
    setWait: (state, action) => {
      state.wait = action.payload;
    },
  },
});

export const { setRepeat, setWait } = eventSlice.actions;

export default eventSlice.reducer;
