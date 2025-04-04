import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../../utills/axiosInstance";

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
            const response = await axiosInstance.post('/user/register', data);
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
            const response = await axiosInstance.post('/user/login', data);
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
            const response = await axiosInstance.post('/user/logout', data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }
)

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/user/check-auth');
            console.log(response.data);
            if (response.data?.success) {
                return response.data?.data
            }
        } catch (error) {
            return rejectWithValue(JSON.stringify(error));            
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
        builder.addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isValid = true;
            state.user = action.payload;
            state.error = null
        })
        builder.addCase(checkAuth.rejected, (state, action) => {
            state.isLoading = true;
            state.isValid = false;
            state.user = null;
            state.error = JSON.parse(action.payload)
        })
    }
})

export default authSlice.reducer;