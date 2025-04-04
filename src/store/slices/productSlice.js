import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedProduct: null,
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
        clearProduct: (state) => {
            state.selectedProduct = null;
        },
    },
});

export const { setProduct, clearProduct } = productSlice.actions;
export default productSlice.reducer;