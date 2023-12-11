import { createSlice } from "@reduxjs/toolkit";
import { fetchCities, fetchTypes } from "../../api/api";

const initialState = {
  citiesOptions: [],
  typesOptions: [],
};

const slice = createSlice({
  name: "selectSlice",
  initialState,
  reducers: {
    setCitiesOptions(state, action) {
      state.citiesOptions = [...action.payload];
    },
    setTypesOptions(state, action) {
      state.typesOptions = [...action.payload];
    },
  },
});

export const getCitiesOptions = () => {
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

export const getTypesOptions = () => {
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
