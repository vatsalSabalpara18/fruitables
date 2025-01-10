import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    subcategories: [],
    error: null,
};

const subcategorySlice = createSlice({
    name: "subcategory",
    initialState,
    reducers: {
        getSubCategories: (state, action) => { },
        addSubCategories: (state, action) => {
            state.subcategories.push(action.payload);
        },
        deleteCategories: (state, action) => {
            state.subcategories = state.subcategories.filter(
                (v) => v.id !== action.payload
            );
        },
        updateCategories: (state, action) => {
            state.subcategories = state.subcategories.map((v) =>
                v.id === action.payload.id ? action.payload : v
            );
        },
    },
});

export const {
    addSubCategories,
    getSubCategories,
    deleteCategories,
    updateCategories,
} = subcategorySlice.actions;
export default subcategorySlice.reducer;
