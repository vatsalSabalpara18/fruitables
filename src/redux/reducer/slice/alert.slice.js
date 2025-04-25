import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    varriant: '',
    message: ''
}

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setAlert: (state, action) => {
            state.varriant = action.payload.varriant;
            state.message = action.payload.message;
        },
        resetAlert: (state) => {
            state.varriant = '';
            state.message = '';
        }
    }
});

export const { setAlert, resetAlert } = alertSlice.actions;

export default alertSlice.reducer;