import { Action, createSlice, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: any = {
  messages: [],
};

const slice = createSlice({
  name: "errorSlice",
  initialState,
  reducers: {
    setErrors(state, action) {
      state.messages = action.payload;
    },
  },
});

export default slice.reducer;

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const setRequestError = (err: any): AppThunk<void> => {
  return (dispatch, getState) => {
    if (err.data) {
      const message = Object.values(err.data).join("\n");
      // enqueueSnackbar(message, { variant: "error" });
    } else {
      // enqueueSnackbar("Something went wrong", { variant: "error" });
    }
    const { errorSlice } = getState();
    dispatch(slice.actions.setErrors([...errorSlice.messages, err]));
  };
};
