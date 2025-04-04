import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  updatedFormDataPaid: {}, // Estado inicial vacío
};

const formSlice = createSlice({
  name: "updatedFormDataPaid",
  initialState,
  reducers: {
    setUpdatedFormDataPaid: (state, action) => {
      state.updatedFormDataPaid = action.payload;
    },
  },
});

export const { setUpdatedFormDataPaid } = formSlice.actions;

export default formSlice.reducer;
