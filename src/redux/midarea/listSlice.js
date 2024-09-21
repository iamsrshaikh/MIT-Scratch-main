import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  midAreaLists: [
    {
      id: 'midAreaList-0',
      comps: ['MOVE'],
    },
  ],
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setList: (state, action) => {
      const index = state.midAreaLists.findIndex((x) => x.id === action.payload.id);
      const all_lists = [...state.midAreaLists]; // Create a copy of the array
      const [item] = all_lists.splice(index, 1);
      item.comps = action.payload.list; // Update comps with new list
      all_lists.splice(index, 0, item); // Place the item back
      state.midAreaLists = all_lists; // Assign the updated array to state
    },
    addList: (state) => {
      const old_list = [...state.midAreaLists]; // Create a copy of the array
      const new_list_add = {
        id: `midAreaList-${state.midAreaLists.length}`,
        comps: ['MOVE'],
      };
      old_list.push(new_list_add);
      state.midAreaLists = old_list; // Assign the updated array to state
    },
  },
});

export const { setList, addList } = listSlice.actions;

export default listSlice.reducer;
