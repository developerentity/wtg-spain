import {
  Action,
  PayloadAction,
  ThunkAction,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fetchCities, fetchTypes } from "../../api/api";

export type OptionType = {
  id: string;
  name: string;
};
interface IInitialState {
  citiesOptions: Array<OptionType>;
  typesOptions: Array<OptionType>;
}

const initialState: IInitialState = {
  citiesOptions: [],
  typesOptions: [],
};

const slice = createSlice({
  name: "selectSlice",
  initialState,
  reducers: {
    setCitiesOptions(state, action: PayloadAction<Array<OptionType>>) {
      state.citiesOptions = [...action.payload];
    },
    setTypesOptions(state, action: PayloadAction<Array<OptionType>>) {
      state.typesOptions = [...action.payload];
    },
  },
});

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const getCitiesOptions = (): AppThunk<void> => {
  return async (dispatch) => {
    try {
      const data = await fetchCities();
      if (!!data) {
        dispatch(setCitiesOptions(data));
      }
    } catch (err) {
      console.error(">>>>>>>>>>ERROR", err);
    }
  };
};

export const getTypesOptions = (): AppThunk<void> => {
  return async (dispatch) => {
    try {
      const data = await fetchTypes();
      if (!!data) {
        dispatch(setTypesOptions(data));
      }
    } catch (err) {
      console.error(">>>>>>>>>>ERROR", err);
    }
  };
};

export default slice.reducer;

export const { setCitiesOptions, setTypesOptions } = slice.actions;
