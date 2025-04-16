import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../../utills/axiosInstance"
import { setAlert } from "./alert.slice"

const initialState = {
    isLoading: false,
    categories: [],
    error: null
}

export const createCategory = createAsyncThunk(
    'Category/createCategory',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('categories/add-category', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (response.data?.success) {
                dispatch(setAlert({ varriant: 'success', message: response?.data?.message }));
                return response.data.data;
            }
        } catch (error) {
            dispatch(setAlert({ varriant: 'error', message: error?.response?.data?.message }));
            return rejectWithValue(error?.response?.data?.message);
        }
    }
)

export const getCategories = createAsyncThunk(
    'Category/getCategories', async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('categories/list-categories');
            if (response?.data?.success) {
                // dispatch(setAlert({ varriant: 'success', message: response?.data?.message }));
                return response.data?.data;
            }
        } catch (error) {
            // dispatch(setAlert({ varriant: 'error', message: error?.response?.data?.message }));
            return rejectWithValue(error?.response?.data?.message);
        }
    }
)

export const deleteCategories = createAsyncThunk(
    'Category/deleteCategories', async (id, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete('categories/delete-category/' + id);
            if (response.data?.success) {
                dispatch(setAlert({ varriant: 'success', message: response?.data?.message }));
                return response.data?.data?._id
            }
        } catch (error) {
            dispatch(setAlert({ varriant: 'error', message: error?.response?.data?.message }));
            return rejectWithValue(error?.response?.data?.message);
        }
    }
)

export const updateCategory = createAsyncThunk(
    'Category/updateCategory', async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosInstance.put('categories/update-category/' + data?._id, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data?.success) {
                dispatch(setAlert({ varriant: 'success', message: response?.data?.message }));
                return response.data.data;
            }
        } catch (error) {
            dispatch(setAlert({ varriant: 'error', message: error?.response?.data?.message }));
            return rejectWithValue(error?.response?.data?.message);
        }
    }
)

const categorySlice = createSlice({
    name: 'Category',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(createCategory.fulfilled, (state, action) => {
            state.categories.push(action.payload);
        })
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
        })
        builder.addCase(deleteCategories.fulfilled, (state, action) => {
            state.categories = state.categories.filter((v) => v._id !== action.payload);
        })
        builder.addCase(updateCategory.fulfilled, (state, action) => {
            state.categories = state.categories.map((v) => v._id === action.payload._id ? action.payload : v);
        })
        builder.addCase(getCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.categories = null;
            state.error = action.payload;
        })
        builder.addCase(createCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.categories = null;
            state.error = action.payload;
        })
        builder.addCase(updateCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.categories = null;
            state.error = action.payload;
        })
        builder.addCase(deleteCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.categories = null;
            state.error = action.payload;
        })

    }
})

export default categorySlice.reducer;