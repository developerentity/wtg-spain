import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const slice = createSlice({
  name: "itemsSlice",
  initialState,
  reducers: {
    addItem(state, action) {
      const newId = Math.random().toString(36).substring(2, 10);
      action.payload === null
        ? (state.items = [
            ...state.items.concat({
              keyId: newId,
              id: "",
              price: "",
              city: "",
              type: "",
            }),
          ])
        : (state.items = [
            ...state.items.concat({ ...action.payload, id: "", keyId: newId }),
          ]);
    },
    changeValueOfItem(state, action) {
      const idToReplace = action.payload.keyId;
      state.items = state.items.map((obj) => {
        if (obj.keyId === idToReplace) {
          return {
            ...obj,
            [action.payload.keyOfTheObj]: action.payload.value,
          };
        }
        return obj;
      });
    },
    changeAllValuesOfItemsWithThisKey(state, action) {
      const { keyOfTheObj, value } = action.payload;
      state.items = [
        ...state.items.map((obj) => ({
          ...obj,
          [keyOfTheObj]: value,
        })),
      ];
    },
    removeItem(state, action) {
      state.items = [
        ...state.items.filter((item) => item.keyId !== action.payload),
      ];
    },
    clearList(state) {
      state.items = [];
    },
  },
});

export const {
  addItem,
  changeValueOfItem,
  changeAllValuesOfItemsWithThisKey,
  removeItem,
  clearList,
} = slice.actions;

export default slice.reducer;
