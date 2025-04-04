import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {}, // Estado inicial
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload; // Actualizar directamente el objeto en Redux
    },
  },
});

export const { setFormData } = formDataSlice.actions;

export default formDataSlice.reducer;
