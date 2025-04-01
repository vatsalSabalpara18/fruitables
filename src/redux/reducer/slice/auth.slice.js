import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isLoading: false,
    isValid: false,
    user: null,
    error: null
}

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (data) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/user/register', data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (data) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/user/login', data, { withCredentials: true });
            console.log(response.data);

            if (response.data?.success) {
                return response.data?.data
            }

        } catch (error) {
            console.error(error);
        }
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (data) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/user/logout', data, { withCredentials: true });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isValid = true;
            state.user = action.payload;
            state.error = null
        })
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isValid = false;
            state.user = null;
            state.error = null;
        })
    }
})

export default authSlice.reducer;