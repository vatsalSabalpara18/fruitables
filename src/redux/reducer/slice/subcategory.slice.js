import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    subcategories: [],
    error: null
};

const subcategorySlice = createSlice({
    name: 'subcategory',
    initialState,
    reducers: {
        getSubCategories: (state, action) => {            
        },
        addSubCategories: (state, action) => {
            state.subcategories.push(action.payload);
        }
    }
});

export const { addSubCategories, getSubCategories } = subcategorySlice.actions;
export default subcategorySlice.reducer;