import { createSlice } from '@reduxjs/toolkit';

const localFormDataSlice = createSlice({
  name: 'localFormData',
  initialState: {},
  reducers: {
    setLocalFormData: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setLocalFormData } = localFormDataSlice.actions;
export default localFormDataSlice.reducer;
