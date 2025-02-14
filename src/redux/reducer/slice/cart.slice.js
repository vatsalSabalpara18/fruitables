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
            const index = state.cartData.findIndex((item) => item.pId === action.payload);
            state.cartData[index].qty++;
        },
        decrementQty: (state, action) => {
            const index = state.cartData.findIndex((item) => item.pId === action.payload);
            state.cartData[index].qty--;
        },
        removeProduct: (state, action) => {
            state.cartData = state.cartData.filter((item) => item?.pId !== action.payload);
        }
    }
})

export const { addToCart, incrementQty, decrementQty, removeProduct } = cartSlice?.actions;

export default cartSlice.reducer;
