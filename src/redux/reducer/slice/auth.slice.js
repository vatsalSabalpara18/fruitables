import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../../utills/axiosInstance";
import { setAlert } from "./alert.slice";

const initialState = {
    isLoading: false,
    isValid: false,
    user: null,
    error: null
}

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/user/register', data);
            console.log(response.data);
            if (response.data.success) {
                localStorage.setItem('userEmail', response?.data?.data?.email);
                dispatch(setAlert({ varriant: 'success', message: response?.data?.message }));
            }
        } catch (error) {
            dispatch(setAlert({ varriant: 'error', message: error?.response?.data?.message }));
            return rejectWithValue(error?.response?.data?.message);
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/user/login', data);
            console.log(response.data);

            if (response.data?.success) {
                dispatch(setAlert({ varriant: 'success', message: response?.data?.message }));
                return response.data?.data
            }

        } catch (error) {
            dispatch(setAlert({ varriant: 'error', message: error?.response?.data?.message }));
            return rejectWithValue(error?.response?.data?.message);
        }
    }
)
export const verifyOTP = createAsyncThunk(
    'auth/verifyOTP',
    async (data, { dispatch }) => {
        try {
            const response = await axiosInstance.post('/user/verify-otp', data);
            console.log(response.data);

            if (response.data?.success) {
                localStorage.removeItem('userEmail');
                dispatch(setAlert({ varriant: 'success', message: response?.data?.message }));                
            }

        } catch (error) {
            dispatch(setAlert({ varriant: 'error', message: error?.response?.data?.message }));            
        }
    }
)
export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (data, { dispatch }) => {
        try {
            const response = await axiosInstance.post('/user/forgot-password', data);
            console.log(response.data);

            if (response.data?.success) {                
                dispatch(setAlert({ varriant: 'success', message: response?.data?.message }));                
            }

        } catch (error) {
            dispatch(setAlert({ varriant: 'error', message: error?.response?.data?.message }));            
        }
    }
)
export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (data, { dispatch }) => {
        try {
            const response = await axiosInstance.post('/user/reset-password', data);
            console.log(response.data);

            if (response.data?.success) {                
                dispatch(setAlert({ varriant: 'success', message: response?.data?.message }));                
            }

        } catch (error) {
            dispatch(setAlert({ varriant: 'error', message: error?.response?.data?.message }));            
        }
    }
)



export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/user/logout', data);
            console.log(response.data);
            if (response.data.success) {
                dispatch(setAlert({ varriant: 'success', message: response?.data?.message }));
            }
        } catch (error) {
            dispatch(setAlert({ varriant: 'error', message: error?.response?.data?.message }));
            return rejectWithValue(error?.response?.data?.message);
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
            return rejectWithValue(error?.response?.data?.message);
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
        builder.addCase(forgotPassword.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isValid = false;
            state.user = null;
            state.error = null;
        })
        builder.addCase(checkAuth.rejected, (state, action) => {
            state.isLoading = false;
            state.isValid = false;
            state.user = null;
            state.error = action.payload
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isValid = false;
            state.user = null;
            state.error = action.payload
        })
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isValid = false;
            state.user = null;
            state.error = action.payload
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isValid = false;
            state.user = null;
            state.error = action.payload
        })
    }
})

export default authSlice.reducer;