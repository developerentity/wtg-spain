import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ItemType = {
  keyId: string;
  id: string;
  price: string;
  city: string;
  type: string;
};

type InitialStateType = {
  items: Array<ItemType>;
};

const initialState: InitialStateType = {
  items: [],
};

const slice = createSlice({
  name: "itemsSlice",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ItemType | null>) {
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
    changeValueOfItem(
      state,
      action: PayloadAction<{
        keyOfTheObj: keyof ItemType;
        keyId: string;
        value: ItemType[keyof ItemType];
      }>
    ) {
      const idToReplace = action.payload.keyId;
      state.items = state.items.map((obj) => {
        if (obj.keyId === idToReplace) {
          return {
            ...obj,
            [action.payload.keyOfTheObj]: action.payload.value,
          } as ItemType;
        }
        return obj;
      });
    },
    changeAllValuesOfItemsWithThisKey(
      state,
      action: PayloadAction<{
        keyOfTheObj: keyof ItemType;
        value: ItemType[keyof ItemType];
      }>
    ) {
      const { keyOfTheObj, value } = action.payload;
      state.items = [
        ...state.items.map((obj) => ({
          ...obj,
          [keyOfTheObj]: value,
        })),
      ];
    },
    removeItem(state, action: PayloadAction<string>) {
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
