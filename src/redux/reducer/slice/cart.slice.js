import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    cartData: [],
    error: null
}

const cartSlice = createSlice({
    name: 'Cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {                    
            const match = state.cartData?.find((item) => item?.pId === action.payload?.pId);
            if (match) {
                match.qty += action.payload.qty;
            } else {
                state.cartData?.push(action.payload);
            }
        },
        incrementQty: (state, action) => {

        },
        decrementQty: (state, action) => {

        },
        removeProduct: (state, action) => {

        }
    }
})

export const { addToCart } = cartSlice?.actions;

export default cartSlice.reducer;
